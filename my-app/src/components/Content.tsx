import { useEffect,useState } from "react"
import { IMusic, ISection } from "./interfaces"
import Section from "./Section"
import * as APIConst from "./API/consts"
import { API } from "./API/API"
import {Link} from "react-router-dom"

export default function Content(){
    const [allSections,setAllSections]=useState<ISection[]>([])
    const[myAPI]=useState<API>(new API())
    const[newReleasesList,setNewReleasesList]=useState<IMusic[]>([])
    const[recommendList,setRecommendList]=useState<IMusic[]>([])
    useEffect(()=>{
        if (window.location.search.length>0){
            const CODE=myAPI.getCode()
            myAPI.requestAccessToken(myAPI.fetchAccessToken(CODE))
            window.history.pushState("", "", APIConst.REDIRECT_URI);
            localStorage.setItem('devicesAmount','0')
        }
        if (localStorage.getItem('refresh_token')!==null){
            getNewReleases()
            getRecommend()
        }

        function getNewReleases(){
            myAPI.fetchApi('GET','https://api.spotify.com/v1/browse/new-releases?limit=10',processNewReleases,null)
        }
        /**
         *Обработка ответа сервера на запрос о новых релизах
         * @param this ответ сервера
         */
        function processNewReleases(this:XMLHttpRequest){
            if (this.status===200){
                const data=JSON.parse(this.responseText)
                let newList:IMusic[]
                newList=[]
                for(let i=0;i<data.albums.items.length;i++){
                    const elem=data.albums.items[i]
                    let newElem:IMusic
                    newElem={
                        photo:elem.images[1].url,
                        footer_photo:elem.images[2].url,
                        id:String(i),
                        first_title:elem.name,
                        second_title:elem.artists[0].name
                    }
                    newList.push(newElem)
                }
                setNewReleasesList(newList)
            }
            else{
                if (this.status===401){
                    myAPI.requestAccessToken(myAPI.refreshAccessToken())
                }
                else{
                    alert(this.responseText);
                }
            }
        }
        function getRecommend(){
            myAPI.fetchApi('GET',myAPI.recQuary(),processRecommendResponse,null)
        }
        /**
         * Обработка ответа сервера на запрос о рекомендациях
         * @param this ответ сервера
         */
        function processRecommendResponse(this:XMLHttpRequest): void{
            if (this.status===200){
                const data=JSON.parse(this.responseText)
                let newList:IMusic[]
                newList=[]
                for(let i=0;i<data.tracks.length;i++){
                    const elem=data.tracks[i].album
                    let newElem:IMusic
                    newElem={
                        photo:elem.images[1].url,
                        footer_photo:elem.images[2].url,
                        id:String(i),
                        first_title:elem.name,
                        second_title:elem.artists[0].name
                    }
                    newList.push(newElem)
                }
                setRecommendList(newList)
            }
            else{
                if (this.status===401){
                    myAPI.requestAccessToken(myAPI.refreshAccessToken())
                }
                else{
                    alert(this.responseText);
                }
            }
        }
    },[myAPI])
    useEffect(()=>{
        let newReleases:ISection
        newReleases={
            text:"Новые релизы",
            id:'1',
            musicBoxList:newReleasesList
        }
        let recomendation:ISection
        recomendation={
            text:'Рекомендации',
            id:'2',
            musicBoxList:recommendList
        }
        setAllSections([newReleases,recomendation])
    },[recommendList,newReleasesList])
    return(
    <main className="content">
        <header className="spoty__header">
            <button className="spoty__header__button" onClick={myAPI.requestAuthorization}>
                <Link to='/callback' className="auth-button">     Авторизация     </Link>
            </button>
            <div className="hidden-bar"></div>
        </header>
        <div className="content-spacing">
            {
                allSections.map((item)=>(
                    <Section text={item.text} key={item.id} musicBoxList={item.musicBoxList}/>
                )
                )
            }
        </div>
    </main>
    )
}