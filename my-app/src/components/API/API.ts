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
 * @param callback обработчик ответа запроса
 */
export function fetchData(url: string, callback: () => void) {
    const accessToken = localStorage.getItem('access_token')
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(callback)
        .catch(reason => alert('Error: ' + reason))
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
