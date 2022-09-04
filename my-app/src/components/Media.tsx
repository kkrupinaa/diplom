import { useContext, useEffect, useState } from "react"
import { SectionContext } from "../Context"
import { API } from "./API/API"
import { sectionList } from "./classes"
import SectionPlaylist from "./PlaylistSection"
import * as callback from './API/callbacks'

export default function Media() {
    const [mediaSections, setMediaSections] = useState(useContext(SectionContext))
    useEffect(() => {
        API.fetchData('https://api.spotify.com/v1/me/playlists', callback.handleData(new sectionList(setMediaSections)))
    }, [])
    return (
        <main className="content">
            <header className="spoty__header">
                <div className="welcome-text">Нажмите на название плейлиста, чтобы просмотреть песни</div>
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