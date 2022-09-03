import { useState } from "react"
import { IMusic, ISection } from "./interfaces"
import { API } from "./API/API"
import Section from "./Section"
import { Album, musicList } from "./classes"

export default function Search() {
    const [searchList, setSearchList] = useState<IMusic[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    /**
     *Восстановить последний поисковый запрос
     * @returns Последний поисковый запрос
     */
    function saveSearchValue(): string {
        let last_search = localStorage.getItem('search_value') as string
        if (last_search === null) last_search = 'Hello'
        search(last_search, 'album')
        return last_search
    }
    /**
     *Обработчик ввода в поисковую строку
     * @param e event
     */
    function onChangeInput(e: any) {
        const input = e.target as any;
        setSearchValue(input.value)
        localStorage.setItem('search_value', input.value)
        if (searchValue !== '') {
            search(searchValue, 'album')
        }
    }
    /**
     * Запрос на поиск по серверу
     * @param album название альбома
     * @param type тип(альбом)
     */
    function search(album: string, type: string) {
        API.fetchApi(API.searchQuery(album, type), API.UseAPI(new musicList(setSearchList,new Album())))
    }
    let searchSection: ISection = {
        text: 'Результаты поиска',
        id: '1',
        musicBoxList: searchList,
        href: ''
    }
    const searchSections:ISection[]=[searchSection]
    return (
        <main className="content">
            <header className="spoty__header">
                <div>
                    <input type="search" className="header-search" value={saveSearchValue()} onChange={onChangeInput} />
                </div>
            </header>
            <div className="content-spacing">
                {
                    searchSections.map((item) => (
                        <Section text={item.text} key={item.id} musicBoxList={item.musicBoxList} id={item.id} href={''} />
                    ))
                }
            </div>
        </main>
    )
}