import * as APIConst from './consts'
import * as query from './query'
import * as callbacks from './callbacks'
/**
* Запросить у сервера токен
* @param body тело запроса
*/
export async function fetchToken(body: string) {
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
        alert('Error: ' + response)
    }
}
/**
 * Запрос серверу
 * @param url ссылка
 */
export const fetchData = async (url: string, signal: AbortSignal) => {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        signal: signal
    })
    const status = res.status
    const data = await res.json()
    return {
        data: data,
        responseStatus: status
    }
}
/**
 *Получить код авторизации
    */
export function requestAuthorization() {
    const url = query.autorizationQuery()
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    })
    window.location.href = url
}
