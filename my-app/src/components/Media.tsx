import { useContext, useMemo, useState } from "react"
import { SectionContext } from "../Context"
import { sectionList } from "./classes"
import SectionPlaylist from "./PlaylistSection"
import * as callback from './API/callbacks'
import { useDataFetch } from "./hooks/useDataFetch"
import { IData } from "./interfaces"

export default function Media() {
    const [mediaSections, setMediaSections] = useState(useContext(SectionContext))

    const APIResponse = useDataFetch<IData>('https://api.spotify.com/v1/me/playlists')
    useMemo(() => {
        callback.handleDownloadData(new sectionList(setMediaSections), APIResponse)
    }, [APIResponse])
    return (
        <main className="content">
            <header className="spoty__header">
                <div className="welcome-text">Нажмите на название плейлиста, чтобы просмотреть песни</div>
                <div className="hidden-bar"></div>
            </header>
            <div className="content-spacing">
                {
                    mediaSections.map((item) => (
                        <SectionPlaylist text={item.text} initialMusicBoxList={item.initialMusicBoxList} key={item.id} id={item.id} href={item.href} />
                    ))
                }
            </div>
        </main>
    )
}