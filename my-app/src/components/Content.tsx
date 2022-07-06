import { useEffect, useState } from "react"
import { IMusic, ISection } from "./interfaces"
import Section from "./Section"
import * as APIConst from "./API/consts"
import { API } from "./API/API"
import { Link } from "react-router-dom"

function UseAPI(setFunc:React.Dispatch<React.SetStateAction<IMusic[]>>,type:'album'| 'track'):any{
    return function processResponce(this:XMLHttpRequest){
        if (this.status === APIConst.HTTP_CODES.OK) {
            const data = JSON.parse(this.responseText)
            let newList: IMusic[] = []
            let limit = (type==='album') ? data.albums.items.length : data.tracks.length
            for (let i = 0; i < limit; i++) {
                const elem = (type ==='album')? data.albums.items[i] : data.tracks[i].album
                let newElem:IMusic
                newElem = {
                    photo: elem.images[1].url,
                    footer_photo: elem.images[2].url,
                    id: String(i),
                    first_title: elem.name,
                    second_title: elem.artists[0].name
                }
                newList.push(newElem)
            }
            setFunc(newList)
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
}

export default function Content() {
    const [allSections, setAllSections] = useState<ISection[]>([])
    const [newReleasesList, setNewReleasesList] = useState<IMusic[]>([])
    const [recommendList, setRecommendList] = useState<IMusic[]>([])
    useEffect(() => {
        if (window.location.search.length > 0) {
            const CODE = API.getCode()
            API.requestAccessToken(API.fetchAccessToken(CODE))
            window.history.pushState("", "", APIConst.REDIRECT_URI);
            localStorage.setItem('devicesAmount', '0')
        }
        if (localStorage.getItem('refresh_token') !== null) {
            getNewReleases()
            getRecommend()
        }
        function getNewReleases() {
            API.fetchApi('GET', 'https://api.spotify.com/v1/browse/new-releases?limit=10', UseAPI(setNewReleasesList,'album'), null)
        }
        function getRecommend() {
            API.fetchApi('GET', API.recQuary(), UseAPI(setRecommendList,'track'), null)
        }
    }, [])
    useEffect(() => {
        let newReleases: ISection
        newReleases = {
            text: "Новые релизы",
            id: '1',
            musicBoxList: newReleasesList,
            href: ''
        }
        let recomendation: ISection
        recomendation = {
            text: 'Рекомендации',
            id: '2',
            musicBoxList: recommendList,
            href: ''
        }
        setAllSections([newReleases, recomendation])
    }, [recommendList, newReleasesList])
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