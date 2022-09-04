import * as APIConst from './consts'
import * as query from './quary'
import * as callbacks from './callbacks'
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
    static async fetchToken(body:string){
        try {
            const data = await fetch("https://accounts.spotify.com/api/token", {
                method: 'POST',
                body: body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(APIConst.CLIENT_ID + ":" + APIConst.CLIENT_SECRET)
                }
            })
            data.json().then(callbacks.handleTokenResponce)
        } catch (response) {
            alert('Error: '+ response)
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
 * @param url ссылка
 * @param callback обработчик ответа запроса
 */
static fetchData(url: string, callback: () => void){
    this.accessToken = localStorage.getItem('access_token')
    fetch(url,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + this.accessToken
        }
    })
    .then(callback)
    .catch(reason => alert ('Error: '+ reason))
}

    /**
     *Получить код авторизации
     */
    static requestAuthorization() {
        const url=query.autorizationQuary()
        fetch(url, {
            method: 'GET',
            mode: 'no-cors'
        })
        window.location.href = url
    }
}