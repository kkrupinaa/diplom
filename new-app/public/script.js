import { MusicBoxList } from "./musicboxlist.js";
import { SpotySectionList } from "./spotysectionlist.js";
import { Api } from "./api.js";
/**
 * Запрос кода авторизации
 */
function requestAuthorization() {
    var url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + SpotifyApi.client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(SpotifyApi.redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    });
    window.location.href = url;
}
/**
 * Обновить текущие устройства
 */
function updateDevice() {
    SpotifyApi.fetchApi('GET', 'https://api.spotify.com/v1/me/player/devices', processDevice, null);
}
/**
 * Обработать ответ сервера на запрос об устройствах
 * @param this ответ сервера
 */
function processDevice() {
    if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        removeChilds($devices);
        data.devices.forEach((elem) => addDevice(elem, $devices));
    }
    else {
        if (this.status == 401) {
            SpotifyApi.refreshAccessToken();
        }
        else {
            console.log(this.responseText);
        }
    }
}
/**
 * Очистить список устройств
 * @param parent кореневой узел
 */
function removeChilds(parent) {
    while (parent === null || parent === void 0 ? void 0 : parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
/**
 * Добавить устройство
 * @param data данные о новом устройстве
 * @param parent корневой узел
 */
function addDevice(data, parent) {
    let device = document.createElement('device');
    device.id = data.id;
    parent.id = device.id;
    localStorage.setItem('device_id', data.id);
    parent.insertAdjacentHTML('beforeend', `<device id=${data.id}> </device>`);
}
/**
 * Ссылка для запроса списка рекомендаци
 * @returns искомая ссылка
 */
function recQuary() {
    let url = "https://api.spotify.com/v1/recommendations";
    url += "?limit=10";
    url += "&market=ES";
    url += "&seed_artists=2znSAMoC2z72k1BNWVMzKW";
    url += "&seed_genres=pop%2Crap";
    url += "&seed_tracks=1sIArrTWriaYJC2rz8CM4Z";
    return url;
}
/**
 * Отправить запрос серверу на получение списка рекомендаций
 */
function getRecommend() {
    SpotifyApi.fetchApi('GET', recQuary(), processRecommendResponse, null);
}
/**
 * Обработка ответа сервера на запрос о рекомендациях
 * @param this ответ сервера
 */
function processRecommendResponse() {
    if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        recommend_list.deleteAll();
        for (let i = 0; i < data.tracks.length; i++) {
            const elem = data.tracks[i].album;
            recommend_list.add(elem.images[1].url, elem.name, elem.artists[0].name, elem.tracks);
        }
    }
    else {
        if (this.status == 401) {
            SpotifyApi.refreshAccessToken();
        }
        else {
            console.log(this.responseText);
        }
    }
}
/**
 * Отправить запрос серверу на получение списка новых релизов
 */
function getNewReleases() {
    SpotifyApi.fetchApi('GET', 'https://api.spotify.com/v1/browse/new-releases?limit=10', processNewReleases, null);
}
function processNewReleases() {
    if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        rec_listned.deleteAll();
        for (let i = 0; i < data.albums.items.length; i++) {
            const elem = data.albums.items[i];
            rec_listned.add(elem.images[1].url, elem.name, elem.artists[0].name, elem.tracks);
        }
    }
    else {
        if (this.status == 401) {
            SpotifyApi.refreshAccessToken();
        }
        else {
            console.log(this.responseText);
        }
    }
}
/*function play(total:number){
    let body = {};
    body.context_uri = "spotify:album:1yKeJKgzpRKm7LwHZIQUu9";
    body.offset = {};
    body.offset.position = 1
    body.position_ms = 0;
    let xhr = new XMLHttpRequest()
    xhr.open('PUT', 'https://api.spotify.com/v1/me/player/play"' + "?device_id=" + localStorage.getItem('device_id'), true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    xhr.send(JSON.stringify(body));
}*/
//Создаем список тематических секций на главной странице
const $SpotySectionList = document.querySelector('.content-spacing');
const mySpotySectionList = new SpotySectionList($SpotySectionList);
const $devices = document.createElement('devices');
mySpotySectionList.add("Новые релизы");
mySpotySectionList.add("Рекомендации");
//Добавление музыки в секции
const $MusicBoxList = $SpotySectionList.querySelectorAll(".grid-content");
const rec_listned = new MusicBoxList($MusicBoxList[0]);
const recommend_list = new MusicBoxList($MusicBoxList[1]);
const SpotifyApi = new Api();
const auth_button = document.querySelector('.auth-button');
auth_button.addEventListener('click', requestAuthorization);
const CODE = SpotifyApi.get_code();
SpotifyApi.RequestAccessToken(SpotifyApi.fetchAccessToken(CODE));
window.history.pushState("", "", SpotifyApi.redirect_uri);
SpotifyApi.RequestAccessToken(SpotifyApi.refreshAccessToken());
updateDevice();
getRecommend();
getNewReleases();
//# sourceMappingURL=script.js.map