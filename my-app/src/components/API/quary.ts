import * as APIConst from './consts'

/**
     * Построить тела запроса на токен
     * @param code код авторизации
     * @returns тело запроса
     */
export function accessTokenQuary(code: string):string {
    let body = "code=" + code +
        "&grant_type=authorization_code" +
        "&redirect_uri=" + encodeURI(APIConst.REDIRECT_URI);
    return body
}

/**
 * Ссылка для запроса списка рекомендаци
 * @returns искомая ссылка
 */
export function recQuary(): string {
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
export function searchQuery(album:string, type: string):string {
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
/**
 *Ссылка для запроса авторизации
 * @returns ссылка
 */
export function autorizationQuary():string{
    const url = "https://accounts.spotify.com/authorize" +
    "?client_id=" + APIConst.CLIENT_ID +
    "&response_type=code" +
    "&redirect_uri=" + encodeURI(APIConst.REDIRECT_URI) +
    "&show_dialog=true" +
    "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private"
    return url
}