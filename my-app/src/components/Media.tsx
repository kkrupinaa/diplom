import { useContext, useEffect, useState } from "react"
import { SectionContext } from "../Context"
import { API } from "./API/API"
import { ISection } from "./interfaces"
import * as APIConst from "./API/consts"
import SectionPlaylist from "./PlaylistSection"

export default function Media() {
    const [mediaSections, setMediaSections] = useState(useContext(SectionContext))
    useEffect(() => {
        API.fetchApi('GET', 'https://api.spotify.com/v1/me/playlists', handlePlaylistResponce, null)
        function handlePlaylistResponce(this: XMLHttpRequest) {
            if (this.status === APIConst.HTTP_CODES.OK) {
                let newList: ISection[] = []
                const data = JSON.parse(this.responseText)
                for (let i = 0; i < data.items.length; i++) {
                    let elem = data.items[i]
                    let newElem: ISection = {
                        text: elem.name,
                        musicBoxList: [],
                        id: elem.id,
                        href: elem.href
                    }
                    newList.push(newElem)
                }
                setMediaSections(newList)
            }
        }
    }, [])
    return (
        <main className="content">
            <header className="spoty__header">
                <div className="hidden-bar"></div>
            </header>
            <div className="content-spacing">
                {
                    mediaSections.map((item) => (
                        <SectionPlaylist text={item.text} musicBoxList={item.musicBoxList} key={item.id} id={item.id} href={item.href} />
                    ))
                }
            </div>
        </main>
    )
}