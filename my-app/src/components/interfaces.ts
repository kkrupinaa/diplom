export interface ISection {
    text: string
    musicBoxList: IMusic[]
    id: string
    href:string
}
export interface IMusic {
    photo: string
    footer_photo: string
    id: string
    first_title: string
    second_title: string
}
export interface IFooter {
    firstTitle: string
    secondTitle: string
    photo: string
    liked: boolean
}

export interface ITrack{
    album:object
}
