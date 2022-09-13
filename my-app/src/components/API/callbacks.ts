import { dataList } from "../classes"
import { IError, ITokenData } from "../interfaces"
import * as API from "./API"
import * as APIConst from './consts'
import * as query from './query'
/**
 *Обработка успешного запроса токена
* @param response ответ сервера
*/
export function handleTokenResponce(response: ITokenData) {
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
export function handleData(downloadData: dataList): any {
    return function processResponce(response: any) {
        if (response.status === APIConst.HTTP_CODES.OK) {
            response.json()
                .then((data: any) => downloadData.formList(data))
        }
        else if (response.status === APIConst.HTTP_CODES.NO_TOKEN) {
            API.fetchToken(query.refreshTokenQuery())
        }
        else {
            response.json()
                .then((error: IError) => {
                    const reason = error.error
                    alert('Error: ' + reason.status + ' Message: ' + reason.message)
                })
        }
    }
}
/**
 *Обработать ответ сервера на запрос данных
 * @param downloadData тип данных
 * @param response ответ сервера
 * @param tokenFunc функция для изменения токена
 */
export function handleDownloadData(downloadData: dataList, response: any, tokenFunc: React.Dispatch<React.SetStateAction<string | null>>): any {
    if (response.data !== undefined) {
        if (response.responseStatus === APIConst.HTTP_CODES.OK) {
            downloadData.formList(response.data)
        }
        else if (response.responseStatus === APIConst.HTTP_CODES.NO_TOKEN) {
            API.fetchToken(query.refreshTokenQuery())
            tokenFunc(localStorage.getItem('refresh_token'))
        }
        else {
            alert('Error' + response.responseStatus)
        }
    }
}