import { dataList } from "../classes"
import { ITokenData } from "../interfaces"
import { API } from "./API"
import * as APIConst from './consts'
/**
 *Обработка успешного запроса токена
* @param response ответ сервера
*/
export function handleTokenResponce(response:ITokenData){
if (response.access_token !== undefined) {
    localStorage.setItem('access_token', response['access_token'])
}
if (response.refresh_token !== undefined) {
    localStorage.setItem('refresh_token', response['refresh_token'])
}
}

/**
 *Обработать полученные с сервера данные
 * @param downloadData тип данных
 * @returns callback
 */
export function handleData(downloadData:dataList):any{
    return function processResponce(response:any){
        if (response.status === APIConst.HTTP_CODES.OK){
            response.json()
            .then((data:any) => downloadData.formList(data))
        }
        else if (response.status === APIConst.HTTP_CODES.NO_TOKEN){
            API.fetchToken(API.refreshAccessToken())
        }
        else {
            response.json()
            .then((error:any)=>{
                const reason = error.error
                alert('Error: '+reason.status+' Message: '+ reason.message)
            })
        }
    }
}