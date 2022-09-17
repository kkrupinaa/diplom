import { useEffect, useState } from "react"
import * as API from '../API/API'

export type UseDataFetch<T> = {
    data: T | undefined
    responseStatus: number | undefined
    errorMessage: string
    loadStatus: Status
}
export type Status = "loading" | "loaded" | "error"

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
        API.fetchData(url, controller.signal)
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
