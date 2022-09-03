import { useEffect, useState } from "react"
import { IMusic, ISection } from "./interfaces"
import Section from "./Section"
import * as APIConst from "./API/consts"
import { API } from "./API/API"
import { Link } from "react-router-dom"
import { Album, musicList, Track } from "./classes"

export default function Content() {
    const [newReleasesList, setNewReleasesList] = useState<IMusic[]>([])
    const [recommendList, setRecommendList] = useState<IMusic[]>([])
    function getNewReleases() {
        API.fetchApi('https://api.spotify.com/v1/browse/new-releases?limit=10', API.UseAPI(new musicList(setNewReleasesList, new Album())))
    }
    function getRecommend() {
        API.fetchApi(API.recQuary(), API.UseAPI(new musicList(setRecommendList, new Track())))
    }
    useEffect(() => {
        if (window.location.search.length > 0) {
            const CODE = API.getCode()
            if (CODE !== null) {
                API.requestAccessToken(API.fetchAccessToken(CODE))
                window.history.pushState("", "", APIConst.REDIRECT_URI);
            }
            else alert('Не удалось получить код авторизации, перезагрузите страницу')
            localStorage.setItem('devicesAmount', '0')
        }
        if (localStorage.getItem('refresh_token') !== null) {
            getNewReleases()
            getRecommend()
        }
    }, [])
    const newReleases: ISection = {
        text: "Новые релизы",
        id: '1',
        musicBoxList: newReleasesList,
        href: ''
    }
    const recomendation: ISection = {
        text: 'Рекомендации',
        id: '2',
        musicBoxList: recommendList,
        href: ''
    }
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
                        <Section text={item.text} key={item.id} musicBoxList={item.musicBoxList} id={item.id} href={''} />
                    )
                    )
                }
            </div>
        </main>
    )
}