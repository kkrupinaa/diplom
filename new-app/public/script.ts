import { MusicBoxList } from "./musicboxlist.js"
import { SpotySectionList } from "./spotysectionlist.js"
import {API} from  "./api.js"
import './api.js'
import * as APIConst from './consts.js'
import * as tools from './tools.js'

type myDevice={
    id:string;
}

/**
 * Запрос кода авторизации
 */
function requestAuthorization(){
    let url="https://accounts.spotify.com/authorize" +
        "?client_id=" + APIConst.CLIENT_ID +
        "&response_type=code" +
        "&redirect_uri=" + encodeURI(APIConst.REDIRECT_URI) +
        "&show_dialog=true" +
        "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private"
    fetch(url,{
        method:'GET',
        mode:'no-cors'
    })
    window.location.href=url
}

/**
 * Обновить текущие устройства
 */
function updateDevice(): void{
    SpotifyAPI.fetchApi('GET','https://api.spotify.com/v1/me/player/devices',processDevice,null)
}
/**
 * Обработать ответ сервера на запрос об устройствах
 * @param this ответ сервера
 */
function processDevice(this:XMLHttpRequest){
    if (this.status===200){
        const data=JSON.parse(this.responseText)
        removeChilds(tools.devices)
        localStorage.setItem('devicesAmount',data['devices'].length)
        data.devices.forEach((elem:myDevice)=>addDevice(elem,tools.devices))
    }
    else{
        if (this.status===401){
            SpotifyAPI.refreshAccessToken()
        }
        else{
            alert(this.responseText);
        }
    }
}
/**
 * Очистить список устройств
 * @param parent кореневой узел
 */
function removeChilds(parent:HTMLElement){
    let len=localStorage.getItem('devicesAmount') as string
    for(let i=0;i<+len;i+=1){
        parent.removeChild(parent.firstChild as ChildNode)
    }
}
/**
 * Добавить устройство
 * @param data данные о новом устройстве
 * @param parent корневой узел
 */
function addDevice(data:myDevice,parent:HTMLElement){
    let device=document.createElement('device')
    device.id=data.id
    parent.id=device.id
    localStorage.setItem('device_id',data.id)
    parent.insertAdjacentHTML('beforeend',`<device id=${data.id}> </device>`)
}
/**
 * Ссылка для запроса списка рекомендаци
 * @returns искомая ссылка
 */
function recQuary():string{
    let url="https://api.spotify.com/v1/recommendations" +
        "?limit=10" +
        "&market=ES" +
        "&seed_artists=2znSAMoC2z72k1BNWVMzKW" +
        "&seed_genres=pop%2Crap" +
        "&seed_tracks=1sIArrTWriaYJC2rz8CM4Z"
    return url
}
/**
 * Отправить запрос серверу на получение списка рекомендаций
 */
function getRecommend(){
    SpotifyAPI.fetchApi('GET',recQuary(),processRecommendResponse,null)
}
/**
 * Обработка ответа сервера на запрос о рекомендациях
 * @param this ответ сервера
 */
function processRecommendResponse(this:XMLHttpRequest): void{
    if (this.status===200){
        const data=JSON.parse(this.responseText)
        //recommendList.container.querySelector('hidden-img')?.removeEventListener('click')
        recommendList.deleteAll()
        for(let i=0;i<data.tracks.length;i++){
            const elem=data.tracks[i].album
            recommendList.add(elem.images[1].url,elem.name,elem.artists[0].name,elem.tracks,elem.images[2].url)
        }
    }
    else{
        if (this.status===401){
            SpotifyAPI.requestAccessToken(SpotifyAPI.refreshAccessToken())
        }
        else{
            alert(this.responseText);
        }
    }
}
/**
 * Отправить запрос серверу на получение списка новых релизов
 */
function getNewReleases(){
    SpotifyAPI.fetchApi('GET','https://api.spotify.com/v1/browse/new-releases?limit=10',processNewReleases,null)
}
/**
 *Обработка ответа сервера на запрос о новых релизах
 * @param this ответ сервера
 */
function processNewReleases(this:XMLHttpRequest){
    if (this.status===200){
        const data=JSON.parse(this.responseText)
        recListned.deleteAll()
        for(let i=0;i<data.albums.items.length;i++){
            const elem=data.albums.items[i]
            recListned.add(elem.images[1].url,elem.name,elem.artists[0].name,elem.tracks,elem.images[2].url)
        }
    }
    else{
        if (this.status===401){
            SpotifyAPI.requestAccessToken(SpotifyAPI.refreshAccessToken())
        }
        else{
            alert(this.responseText);
        }
    }
}
/**
 * Функция обработчик перезагрузки страницы
 */
function OnPageLoad(){
    if (window.location.search.length>0){
        handleRedirect()
    }
}
/**
 *Получает токен сразу после авторизации
 */
function handleRedirect(){
    const CODE=SpotifyAPI.getCode()
    SpotifyAPI.requestAccessToken(SpotifyAPI.fetchAccessToken(CODE))
    window.history.pushState("", "", APIConst.REDIRECT_URI);
    localStorage.setItem('devicesAmount','0')
}
document.addEventListener("DOMContentLoaded",OnPageLoad)
//Создаем список тематических секций на главной странице
const spotySectionList=document.querySelector('.content-spacing') as HTMLElement
const mySpotySectionList=new SpotySectionList(spotySectionList)
//const devices=document.createElement('devices') as HTMLElement

mySpotySectionList.add("Новые релизы")
mySpotySectionList.add("Рекомендации")

//Добавление музыки в секции
const musicBoxList=spotySectionList.querySelectorAll(".grid-content")
const recListned=new MusicBoxList(musicBoxList[0] as HTMLElement)
const recommendList=new MusicBoxList(musicBoxList[1] as HTMLElement)

const SpotifyAPI=new API()

const auth_button=document.querySelector('.auth-button') as HTMLElement
auth_button.addEventListener('click', requestAuthorization)
updateDevice()
getRecommend()
getNewReleases()
