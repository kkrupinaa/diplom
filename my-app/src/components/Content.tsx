import { useEffect, useMemo, useState } from "react"
import { IData, IMusic, ISection } from "./interfaces"
import Section from "./Section"
import * as APIConst from "./API/consts"
import * as API from "./API/API"
import { Link } from "react-router-dom"
import { Album, musicList, Track } from "./classes"
import * as query from './API/query'
import { useDataFetch } from "./hooks/useDataFetch"
import * as callbacks from './API/callbacks'

export default function Content() {
    const [newReleasesList, setNewReleasesList] = useState<IMusic[]>([])
    const [recommendList, setRecommendList] = useState<IMusic[]>([])
    const [token, setToken] = useState<string | null>(localStorage.getItem('refresh_token'))

    const recResponse = useDataFetch<IData>(query.recQuery(), token)
    const newReleasesResponse = useDataFetch<IData>('https://api.spotify.com/v1/browse/new-releases?limit=10', token)

    useEffect(() => {
        if (window.location.search.length > 0) {
            const CODE = query.getCode()
            if (CODE !== null) {
                API.fetchToken(query.accessTokenQuery(CODE))
                window.history.pushState("", "", APIConst.REDIRECT_URI);
            }
            else alert('Не удалось получить код авторизации, перезагрузите страницу')
            localStorage.setItem('devicesAmount', '0')
        }
    }, [])

    useMemo(() => {
        callbacks.handleDownloadData(new musicList(setRecommendList, new Track()), recResponse, setToken)
    }, [recResponse])
    useMemo(() => {
        callbacks.handleDownloadData(new musicList(setNewReleasesList, new Album()), newReleasesResponse, setToken)
    }, [newReleasesResponse])
    const newReleases: ISection = useMemo(() => {
        return {
            text: "Новые релизы",
            id: '1',
            initialMusicBoxList: newReleasesList,
            href: ''
        }
    }
        , [newReleasesList])
    const recomendation: ISection = useMemo(() => {
        return {
            text: 'Рекомендации',
            id: '2',
            initialMusicBoxList: recommendList,
            href: ''
        }
    }, [recommendList])
    const allSections: ISection[] = [newReleases, recomendation]
    return (
        <main className="content">
            <header className="spoty__header">
                <button className="spoty__header__button" onClick={API.requestAuthorization}>
                    <Link to='/callback' className="auth-button">     Авторизация     </Link>
                </button>
                <div className="hidden-bar"></div>
            </header>
            <div className="content-spacing">
                {
                    allSections.map((item) => (
                        <Section text={item.text} key={item.id} initialMusicBoxList={item.initialMusicBoxList} id={item.id} href={''} />
                    )
                    )
                }
            </div>
        </main>
    )
}