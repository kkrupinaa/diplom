export interface ISection {
    text: string
    initialMusicBoxList: IMusic[]
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
    album:IAlbum
    images:{
        url:string
    }[]
    name:string
    artists:{
        name:string
    }[]
    id:string
}

export interface IAlbum{
    images:{
        url:string
    }[]
}

export interface IPlaylist{
    track:ITrack
}

export interface IData{
    tracks:ITrack[]
    albums:{
        items: ITrack[]
    }
    items:IPlaylist[]
}

export interface ISectionData{
    items:{
        name:string
        id:string
        href:string
    }[]
}

export interface ITokenData{
    access_token:string
    refresh_token:string
}
export interface IError{
    error:{
        status:string
        message:string
    }
}
