/**
 * Класс для работы с Api
 */
export class Api{
    /**
     * Токен
     */
    access_token:null|string
    /**
     * Токен для обновления
     */
    refresh_token:null|string
    /**
     * id клиента
     */
    client_id :string;
    /**
     * Ссылка переадресации
     */
    redirect_uri : string;
    /**
     * Секретный id клиента
     */
    client_secret:string;
    constructor(){
        this.access_token=null
        this.refresh_token=null
        this.client_id='b6eb20f71b544fcc9c0a2f279857aeed'
        this.redirect_uri='http://localhost:3000/callback'
        this.client_secret='bfed6bfe8cdd4e54a5e8ac4cc93261d6'
    }
    /**
     * Получить код авторизации из текущей ссылки
     * @returns код авторизации
     */
    get_code():string|null{
        let code=null
        const url=window.location.search
        if (url.length>0){
            code = new URLSearchParams(url).get('code')
        }
        return code
    }
    /**
     * Запросить у сервера токен
     * @param body тело запроса
     */
    RequestAccessToken(body:string){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","https://accounts.spotify.com/api/token" , true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret));
        xhr.send(body);
        xhr.onload=this.ProcessTokenResponce
}
    /**
     * Построить тела запроса на токен
     * @param code код авторизации
     * @returns тело запроса
     */
    fetchAccessToken( code:string|null){
        let body = "code=" + code;
        body += "&grant_type=authorization_code";
        body += "&redirect_uri=" + encodeURI(this.redirect_uri);
        return body
}
    /**
     * Обработать ответ сервера на запрос токена
     * @param this ответ сервера
     */
    ProcessTokenResponce(this:XMLHttpRequest){
        if (this.status===200){
            var data = JSON.parse(this.responseText);
            if (data.access_token!=undefined){
                localStorage.setItem('access_token',data['access_token'])
            }
            if (data.refresh_token!=undefined){
                localStorage.setItem('refresh_token',data['refresh_token'])
            }
        }
        else{
            console.log(this.responseText)
        }
}
    /**
     * Построить тело запроса обновления токена
     * @returns тело запроса
     */
    refreshAccessToken():string{
        this.refresh_token = localStorage.getItem("refresh_token");
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + this.refresh_token;
        body += "&client_id=" + this.client_id;
        return body
}
    /**
     * Запрос серверу
     * @param method метод ('GET','PUT',...)
     * @param url ссылка
     * @param callback обработчик ответа запроса
     * @param body тело запроса
     */
    fetchApi(method:string,url:string,callback:any,body:any): void {
        this.access_token=localStorage.getItem('access_token')
        let xhr=new XMLHttpRequest()
        xhr.open(method,url,true)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.access_token);
        xhr.send(body)
        xhr.onload=callback
}
}
