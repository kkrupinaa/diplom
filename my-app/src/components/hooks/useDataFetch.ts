import { useEffect, useState } from "react"


export type UseDataFetch<T> = {
    data: T | undefined
    responseStatus: number | undefined
}
/**
 * Запрос серверу
 * @param url ссылка
 */
export const fetchData = async (url: string) => {
    const accessToken = localStorage.getItem('access_token')
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    const status = res.status
    const data = await res.json()
    return {
        data: data,
        responseStatus: status
    }
}
export const useDataFetch = <T>(url: string, token: string | null): UseDataFetch<T> => {
    const [result, setResult] = useState<UseDataFetch<T>>({
        data: undefined,
        responseStatus: undefined
    })
    useEffect(() => {
        fetchData(url)
            .then((data) => {
                setResult(data)
            })
            .catch(({ status }) => {
                setResult({
                    data: undefined,
                    responseStatus: status
                })
            })
    }, [url, token])
    return result
}
