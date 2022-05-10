import { SpotySectionList } from "./spotysectionlist.js"
import { MusicBoxList } from "./musicboxlist.js"
import {Api} from "./api.js"

const $SpotySectionList=document.querySelector('.content-spacing') as HTMLElement
const mySpotySectionList=new SpotySectionList($SpotySectionList)
mySpotySectionList.add("Результат поиска")

const $MusicBoxList=$SpotySectionList.querySelectorAll(".grid-content")
const search_list=new MusicBoxList($MusicBoxList[0] as HTMLElement)
const SpotifyApi=new Api()

/**
 * Ссылка для поискового запроса
 * @param album название альбома
 * @param type тип (пока только альбом)
 * @returns ссылка
 */
function searchQuery(album='',type:string){
    var url="https://api.spotify.com/v1/search"
    url+="?q="+"remaster "
    if (album!=''){
        url+="album:"+album
    }
    url+="&type="+type
    url+="&market=ES"
    url+="&limit=10"
    url+="&offset=0"
    return url
}
/**
 * Запрос на поиск по серверу
 * @param album название альбома
 * @param type тип(альбом)
 */
function search(album:string,type:string){
    SpotifyApi.fetchApi('GET',searchQuery(album,type),ProcessSearchResponce,null)
}
/**
 * Обработать ответ сервера на поисковый запрос
 * @param this ответ сервера
 */
function ProcessSearchResponce(this:XMLHttpRequest){
    if (this.status===200){
    const data=JSON.parse(this.responseText)
    const array=data.albums.items
    search_list.deleteAll()
    for(let i=0;i<array.length;i++){
        const elem=array[i]
        search_list.add(elem.images[1].url,elem.name,elem.artists[0].name,elem.tracks)
    }
    }
    else{
    if (this.status==401){
        SpotifyApi.refreshAccessToken()
    }
    else{
        console.log(this.responseText);
    }
    }
}
const $searchInput=document.querySelector('.header-search') as HTMLInputElement
$searchInput.addEventListener('change',()=>{
    const input = event?.target as any;
    const searchValue = input.value;
    localStorage.setItem('search_value',searchValue)
    if (searchValue!=''){
        search(searchValue,'album')
    }
})
/**
 * Сохранение строки поиска при обновлении страницы
 */
function onPageLoad(){
    const searchValue=localStorage.getItem('search_value') as string
    search(searchValue,'album')
    $searchInput.value=searchValue
}
document.addEventListener("DOMContentLoaded", onPageLoad)