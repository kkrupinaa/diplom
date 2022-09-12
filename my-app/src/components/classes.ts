import { IData, IMusic, IPlaylist, ISection, ISectionData, ITrack } from "./interfaces"
export abstract class Music {
    elements: ITrack[]
    photo: string[]
    footer_photo: string[]
    first_title: string[]
    second_title: string[]
    id: string[]
    constructor() {
        this.elements = []
        this.photo = []
        this.footer_photo = []
        this.first_title = []
        this.second_title = []
        this.id = []
    }
    abstract setElements(data: IData): void
    abstract setPhoto(): void
    abstract setFooterPhoto(): void
    abstract setFirstTitle(): void
    abstract setSecondTitle(): void
    abstract setId(): void
}
export class Track extends Music {
    setElements(data: IData) {
        this.elements = data.tracks
    }
    setPhoto() {
        this.photo = this.elements.map((elem: ITrack) => elem.album.images[1].url)
    }
    setFooterPhoto() {
        this.footer_photo = this.elements.map((elem: ITrack) => elem.album.images[2].url)
    }
    setFirstTitle() {
        this.first_title = this.elements.map((elem: ITrack) => elem.name)
    }
    setSecondTitle() {
        this.second_title = this.elements.map((elem: ITrack) => elem.artists[0].name)
    }
    setId() {
        this.id = this.elements.map((elem: ITrack) => elem.id)
    }
}
export class Album extends Track {
    setElements(data: IData): void {
        this.elements = data.albums.items
    }
    setPhoto(): void {
        this.photo = this.elements.map((elem: ITrack) => elem.images[1].url)
    }
    setFooterPhoto(): void {
        this.footer_photo = this.elements.map((elem: ITrack) => elem.images[2].url)
    }
}
export class Playlist extends Track {
    setElements(data: IData): void {
        this.elements = data.items.map((elem: IPlaylist) => elem.track)
    }
}
export abstract class dataList {
    abstract formList(data: any): void
}

export function formMusicList(type: Music, data: IData): IMusic[] {
    type.setElements(data)
    type.setFirstTitle()
    type.setSecondTitle()
    type.setPhoto()
    type.setFooterPhoto()
    type.setId()
    let newList: IMusic[] = []
    for (let i = 0; i < type.elements.length; i++) {
        let newElem: IMusic = {
            photo: type.photo[i],
            footer_photo: type.footer_photo[i],
            id: type.id[i],
            first_title: type.first_title[i],
            second_title: type.second_title[i]
        }
        newList.push(newElem)
    }
    return newList
}

export class musicList extends dataList {
    setFunc: React.Dispatch<React.SetStateAction<IMusic[]>>
    type: Music
    constructor(setFunc: React.Dispatch<React.SetStateAction<IMusic[]>>, type: Music) {
        super()
        this.setFunc = setFunc
        this.type = type
    }
    formList(data: IData) {
        this.type.setElements(data)
        this.type.setPhoto()
        this.type.setFooterPhoto()
        this.type.setFirstTitle()
        this.type.setSecondTitle()
        this.type.setId()
        let newList: IMusic[] = []
        for (let i = 0; i < this.type.elements.length; i++) {
            let newElem: IMusic = {
                photo: this.type.photo[i],
                footer_photo: this.type.footer_photo[i],
                id: this.type.id[i],
                first_title: this.type.first_title[i],
                second_title: this.type.second_title[i]
            }
            newList.push(newElem)
        }
        this.setFunc(newList)
    }
}
export class sectionList extends dataList {
    setFunc: React.Dispatch<React.SetStateAction<ISection[]>>
    constructor(setFunc: React.Dispatch<React.SetStateAction<ISection[]>>) {
        super()
        this.setFunc = setFunc
    }
    formList(data: ISectionData): void {
        let newList: ISection[] = []
        for (let i = 0; i < data.items.length; i++) {
            let elem = data.items[i]
            let newElem: ISection = {
                text: elem.name,
                initialMusicBoxList: [],
                id: elem.id,
                href: elem.href
            }
            newList.push(newElem)
        }
        this.setFunc(newList)
    }
}