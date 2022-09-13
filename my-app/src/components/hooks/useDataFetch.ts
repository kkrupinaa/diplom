import { useEffect, useState } from "react"


export type UseDataFetch<T> = {
    data: T | undefined
    responseStatus: number | undefined
    errorMessage: string
    loadStatus: Status
}
export type Status = "loading" | "loaded" | "error"
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
export const useDataFetch = <T>(url: string, token: string | null): UseDataFetch<T> => {
    const [result, setResult] = useState<UseDataFetch<T>>({
        data: undefined,
        responseStatus: undefined,
        errorMessage: '',
        loadStatus: 'loading'
    })
    useEffect(() => {
        setResult((prev) => {
            return {
                ...prev,
                loadStatus: 'loading'
            }
        })
        const controller = new AbortController()
        fetchData(url, controller.signal)
            .then((data) => {
                setResult(
                    {
                        errorMessage: '',
                        data: data.data,
                        responseStatus: data.responseStatus,
                        loadStatus: 'loaded'
                    }
                )
            })
            .catch((reason) => {
                setResult({
                    data: undefined,
                    errorMessage: reason,
                    loadStatus: 'error',
                    responseStatus: undefined
                }
                )
            })
        return () => {
            controller.abort()
        }
    }, [url, token])
    return result
}
