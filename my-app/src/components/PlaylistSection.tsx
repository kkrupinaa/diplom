import { useMemo, useState } from "react";
import { musicList, Playlist } from "./classes";
import { ISection } from "./interfaces";
import MusicBox from "./MusicBox";
import * as callback from './API/callbacks'
import { useDataFetch } from "./hooks/useDataFetch";

export default function SectionPlaylist(props: ISection) {
    const [curMusic, setCurMusic] = useState(props.initialMusicBoxList)
    const [token, setToken] = useState<string | null>(localStorage.getItem('refresh_token'))
    const playlistData = useDataFetch(props.href + '/tracks', token)
    useMemo(() => {
        callback.handleDownloadData(new musicList(setCurMusic, new Playlist()), playlistData, setToken)
    }, [playlistData])
    return (
        <section className="spoty-section">
            <div className="text-content">{props.text}</div>
            <div className="grid-content">
                {
                    curMusic.map((item) => (
                        <MusicBox
                            photo={item.photo}
                            footer_photo={item.footer_photo}
                            first_title={item.first_title}
                            second_title={item.second_title}
                            key={item.id}
                            id={item.id} />
                    ))
                }
            </div>
        </section>
    )
}