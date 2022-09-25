export type UseDataFetch<T> = {
    data: T | undefined
    responseStatus: number | undefined
    errorMessage: string
    loadStatus: Status
}
export type UseTokenFetch<T> = {
    data: T | undefined
    errorMessage: string
    loadStatus: Status
}
export type Status = "loading" | "loaded" | "error" | 'cancelled'