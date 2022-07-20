import { IData, IMusic, IPlaylist, ISection, ITrack } from '../interfaces'
import * as APIConst from './consts'
/**
 * Класс для работы с Api
 */
export class API {
    /**
     * Токен
     */
    static accessToken: null | string = null
    /**
     * Токен для обновления
     */
    static refreshToken: null | string = null
    /**
     * Получить код авторизации из текущей ссылки
     * @returns код авторизации
     */
    static getCode(): string | null {
        let code = null
        const url = window.location.search
        if (url.length > 0) {
            code = new URLSearchParams(url).get('code')
        }
        return code
    }
    /**
     * Запросить у сервера токен
     * @param body тело запроса
     */
    static requestAccessToken(body: string) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://accounts.spotify.com/api/token", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(APIConst.CLIENT_ID + ":" + APIConst.CLIENT_SECRET));
        xhr.send(body);
        xhr.onload = this.processTokenResponce
    }
    /**
     * Построить тела запроса на токен
     * @param code код авторизации
     * @returns тело запроса
     */
    static fetchAccessToken(code: string | null) {
        let body = "code=" + code +
            "&grant_type=authorization_code" +
            "&redirect_uri=" + encodeURI(APIConst.REDIRECT_URI);
        return body
    }
    /**
     * Обработать ответ сервера на запрос токена
     * @param this ответ сервера
     */
    static processTokenResponce(this: XMLHttpRequest) {
        if (this.status === 200) {
            var data = JSON.parse(this.responseText);
            if (data.access_token !== undefined) {
                localStorage.setItem('access_token', data['access_token'])
            }
            if (data.refresh_token !== undefined) {
                localStorage.setItem('refresh_token', data['refresh_token'])
            }
        }
        else {
            alert(this.responseText)
        }
    }
    /**
     * Построить тело запроса обновления токена
     * @returns тело запроса
     */
    static refreshAccessToken(): string {
        this.refreshToken = localStorage.getItem("refresh_token");
        const body = "grant_type=refresh_token" +
            "&refresh_token=" + this.refreshToken +
            "&client_id=" + APIConst.CLIENT_ID;
        return body
    }
    /**
     * Запрос серверу
     * @param method метод ('GET','PUT',...)
     * @param url ссылка
     * @param callback обработчик ответа запроса
     * @param body тело запроса
     */
    static fetchApi(method: string, url: string, callback: () => void, body: string | null): void {
        this.accessToken = localStorage.getItem('access_token')
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
        xhr.send(body)
        xhr.onload = callback
    }
    /**
     *Получить код авторизации
     */
    static requestAuthorization() {
        const url = "https://accounts.spotify.com/authorize" +
            "?client_id=" + APIConst.CLIENT_ID +
            "&response_type=code" +
            "&redirect_uri=" + encodeURI(APIConst.REDIRECT_URI) +
            "&show_dialog=true" +
            "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private"
        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        })
        window.location.href = url
    }
    /**
 * Ссылка для запроса списка рекомендаци
 * @returns искомая ссылка
 */
    static recQuary(): string {
        let url = "https://api.spotify.com/v1/recommendations" +
            "?limit=10" +
            "&market=ES" +
            "&seed_artists=2znSAMoC2z72k1BNWVMzKW" +
            "&seed_genres=pop%2Crap" +
            "&seed_tracks=1sIArrTWriaYJC2rz8CM4Z"
        return url
    }
    /**
     * Ссылка для поискового запроса
     * @param album название альбома
     * @param type тип (пока только альбом)
     * @returns ссылка
     */
    static searchQuery(album = '', type: string) {
        let url = "https://api.spotify.com/v1/search?q=remaster "
        if (album !== '') {
            url += "album:" + album
        }
        url += "&type=" + type +
            "&market=ES" +
            "&limit=10" +
            "&offset=0"
        return url
    }

    static playlistQuery(): string {
        let url = "?market=ES" +
            "&fields=items(track(name,href))" +
            "&limit=10" +
            "&offset=5"
        return url
    }
    static ProcessIMusicData(data: IData, type: 'album' | 'track' | 'playlist'): IMusic[] {
        let newList: IMusic[] = []
        let elements:ITrack[]=[]
        let photo, footer_photo, first_title, second_title, id: string[] = []
        if (type === 'album') {
            elements = data.albums.items
            photo = elements.map((elem: ITrack) => elem.images[1].url)
            footer_photo = elements.map((elem: ITrack) => elem.images[2].url)
        }
        else {
            if (type === 'playlist') {
                elements = data.items.map((elem: IPlaylist) => elem.track)
            }
            else elements = data.tracks
            photo = elements.map((elem: ITrack) => elem.album.images[1].url)
            footer_photo = elements.map((elem: ITrack) => elem.album.images[2].url)
        }
        first_title = elements.map((elem: ITrack) => elem.name)
        second_title = elements.map((elem: ITrack) => elem.artists[0].name)
        id = elements.map((elem: ITrack) => elem.id)
        for (let i = 0; i < elements.length; i++) {
            let newElem: IMusic = {
                photo: photo[i],
                footer_photo: footer_photo[i],
                id: id[i],
                first_title: first_title[i],
                second_title: second_title[i]
            }
            newList.push(newElem)
        }
        return newList
    }
    static ProcessISectionData(data: any): ISection[] {
        let newList: ISection[] = []
        for (let i = 0; i < data.items.length; i++) {
            let elem = data.items[i]
            let newElem: ISection = {
                text: elem.name,
                musicBoxList: [],
                id: elem.id,
                href: elem.href
            }
            newList.push(newElem)
        }
        return newList
    }
    static UseAPI(setFunc: Function, type: 'album' | 'track' | 'playlist' | 'section'): any {
        return function processResponce(this: XMLHttpRequest) {
            if (this.status === APIConst.HTTP_CODES.OK) {
                const data = JSON.parse(this.responseText)
                if (type !== 'section') {
                    setFunc(API.ProcessIMusicData(data, type))
                }
                else setFunc(API.ProcessISectionData(data))
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
}