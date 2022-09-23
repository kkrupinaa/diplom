import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../../Context"
import * as API from '../API/API'
import * as APIConst from '../API/consts'
import * as query from '../API/query'

export type UseDataFetch<T> = {
    data: T | undefined
    responseStatus: number | undefined
    errorMessage: string
    loadStatus: Status
}
export type Status = "loading" | "loaded" | "error" | 'cancelled'

export const useDataFetch = <T>(url: string): UseDataFetch<T> => {
    const [result, setResult] = useState<UseDataFetch<T>>({
        data: undefined,
        responseStatus: undefined,
        errorMessage: '',
        loadStatus: 'loading'
    })
    const [token, setToken] = useContext(TokenContext)
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
                if (data.responseStatus === APIConst.HTTP_CODES.NO_TOKEN) {
                    API.fetchToken(query.refreshTokenQuery())
                    setToken(localStorage.getItem('refresh_token'))
                }
            })
            .catch((reason) => {
                if (controller.signal.aborted) {
                    setResult({
                        data: undefined,
                        errorMessage: '',
                        loadStatus: 'cancelled',
                        responseStatus: undefined
                    })
                }
                else {
                    setResult({
                        data: undefined,
                        errorMessage: reason,
                        loadStatus: 'error',
                        responseStatus: undefined
                    }
                    )
                }
            })
        return () => {
            controller.abort()
        }
    }, [url, token, setToken])
    return result
}
