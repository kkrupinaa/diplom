import { SpotySectionList } from "./spotysectionlist.js";
import { MusicBoxList } from "./musicboxlist.js";
import { API } from "./api.js";
const spotySectionList = document.querySelector('.content-spacing');
const mySpotySectionList = new SpotySectionList(spotySectionList);
mySpotySectionList.add("Результат поиска");
const musicBoxList = spotySectionList.querySelectorAll(".grid-content");
const search_list = new MusicBoxList(musicBoxList[0]);
const SpotifyAPI = new API();
/**
 * Ссылка для поискового запроса
 * @param album название альбома
 * @param type тип (пока только альбом)
 * @returns ссылка
 */
function searchQuery(album = '', type) {
    let url = "https://api.spotify.com/v1/search" +
        "?q=" + "remaster ";
    if (album != '') {
        url += "album:" + album;
    }
    url += "&type=" + type +
        "&market=ES" +
        "&limit=10" +
        "&offset=0";
    return url;
}
/**
 * Запрос на поиск по серверу
 * @param album название альбома
 * @param type тип(альбом)
 */
function search(album, type) {
    SpotifyAPI.fetchApi('GET', searchQuery(album, type), ProcessSearchResponce, null);
}
/**
 * Обработать ответ сервера на поисковый запрос
 * @param this ответ сервера
 */
function ProcessSearchResponce() {
    if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        const array = data.albums.items;
        search_list.deleteAll();
        for (let i = 0; i < array.length; i++) {
            const elem = array[i];
            search_list.add(elem.images[1].url, elem.name, elem.artists[0].name, elem.tracks, elem.images[2].url);
        }
    }
    else {
        if (this.status === 401) {
            SpotifyAPI.requestAccessToken(SpotifyAPI.refreshAccessToken());
        }
        else {
            alert(this.responseText);
        }
    }
}
const searchInput = document.querySelector('.header-search');
searchInput.addEventListener('change', () => {
    const input = event === null || event === void 0 ? void 0 : event.target;
    const searchValue = input.value;
    localStorage.setItem('search_value', searchValue);
    if (searchValue != '') {
        search(searchValue, 'album');
    }
});
/**
 * Сохранение строки поиска при обновлении страницы
 */
function onPageLoad() {
    const searchValue = localStorage.getItem('search_value');
    search(searchValue, 'album');
    searchInput.value = searchValue;
}
document.addEventListener("DOMContentLoaded", onPageLoad);
//# sourceMappingURL=script2.js.map