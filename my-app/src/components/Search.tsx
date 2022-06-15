import { useEffect, useState } from "react"
import { IMusic, ISection } from "./interfaces"
import { API } from "./API/API"
import * as APIConst from "./API/consts"
import Section from "./Section"

export default function Search() {
    const [searchSections, setSearchSections] = useState<ISection[]>([])
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
        API.fetchApi('GET', API.searchQuery(album, type), ProcessSearchResponce, null)
    }
    /**
     * Обработать ответ сервера на поисковый запрос
     * @param this ответ сервера
     */
    function ProcessSearchResponce(this: XMLHttpRequest) {
        if (this.status === APIConst.HTTP_CODES.OK) {
            const data = JSON.parse(this.responseText)
            const array = data.albums.items
            let newList: IMusic[]
            newList = []
            for (let i = 0; i < array.length; i++) {
                const elem = array[i]
                let newElem: IMusic
                newElem = {
                    photo: elem.images[1].url,
                    footer_photo: elem.images[2].url,
                    id: String(i),
                    first_title: elem.name,
                    second_title: elem.artists[0].name
                }
                newList.push(newElem)
            }
            setSearchList(newList)
        }
        else {
            if (this.status === APIConst.HTTP_CODES.NO_TOKEN) {
                API.requestAccessToken(API.refreshAccessToken())
            }
            else {
                alert(this.responseText);
            }
        }
    }
    useEffect(() => {
        let searchSection: ISection
        searchSection = {
            text: 'Результаты поиска',
            id: '1',
            musicBoxList: searchList
        }
        setSearchSections([searchSection])
    }, [searchList])
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
                        <Section text={item.text} key={item.id} musicBoxList={item.musicBoxList} id={item.id} />
                    ))
                }
            </div>
        </main>
    )
}