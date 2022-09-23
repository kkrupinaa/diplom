import { dataList } from "../classes"
import { ITokenData } from "../interfaces"
import * as APIConst from './consts'
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
 *Обработать ответ сервера на запрос данных
 * @param downloadData тип данных
 * @param response ответ сервера
 * @param tokenFunc функция для изменения токена
 */
export function handleDownloadData(downloadData: dataList, response: any): any {
    if (response.data !== undefined) {
        if (response.responseStatus === APIConst.HTTP_CODES.OK) {
            downloadData.formList(response.data)
        }
        else {
            alert('Error' + response.responseStatus)
        }
    }
}