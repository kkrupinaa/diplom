import { useMemo, useState } from "react"
import { IMusic, ISection } from "./interfaces"
import Section from "./Section"
import { Album, musicList } from "./classes"
import * as query from './API/query'
import * as callback from './API/callbacks'
import { useDataFetch } from "./hooks/useDataFetch"

export default function Search() {
    const [searchList, setSearchList] = useState<IMusic[]>([])
    const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('search_value') as string)
    const [searchUrl, setSearchUrl] = useState<string>(localStorage.getItem('search_query') as string)
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
        const newQuery = query.searchQuery(album, type)
        setSearchUrl(newQuery)
        localStorage.setItem('search_query', newQuery)
    }
    const searchData = useDataFetch(searchUrl)
    useMemo(() => {
        callback.handleDownloadData(new musicList(setSearchList, new Album()), searchData)
    }, [searchData])
    let searchSection: ISection = {
        text: 'Результаты поиска',
        id: '1',
        initialMusicBoxList: searchList,
        href: ''
    }
    const searchSections: ISection[] = [searchSection]
    return (
        <main className="content">
            <header className="spoty__header">
                <div>
                    <input type="search" className="header-search" value={searchValue} onChange={onChangeInput} />
                </div>
            </header>
            <div className="content-spacing">
                {
                    searchSections.map((item) => (
                        <Section text={item.text} key={item.id} initialMusicBoxList={item.initialMusicBoxList} id={item.id} href={''} />
                    ))
                }
            </div>
        </main>
    )
}