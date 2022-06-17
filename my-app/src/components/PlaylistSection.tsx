import React, { useState } from "react";
import { API } from "./API/API";
import { IMusic, ISection } from "./interfaces";
import MusicBox from "./MusicBox";
import * as APIConst from "./API/consts"

export default function SectionPlaylist(props: ISection) {
    const [curMusic, setCurMusic] = useState(props.musicBoxList)

    function handlePlaylistItemsResponce(this: XMLHttpRequest) {
        if (this.status === APIConst.HTTP_CODES.OK) {
            let newList: IMusic[] = []
            const data = JSON.parse(this.responseText)
            for (let i = 0; i < data.items.length; i++) {
                let elem = data.items[i]
                let newElem: IMusic = {
                    photo: elem.track.album.images[1].url,
                    footer_photo: elem.track.album.images[2].url,
                    first_title: elem.track.name,
                    second_title: elem.track.artists[0].name,
                    id: elem.track.id
                }
                newList.push(newElem)
            }
            setCurMusic(newList)
        }
    }
    function onNameClick() {
        if (props.href !== '') {
            API.fetchApi('GET', props.href + '/tracks', handlePlaylistItemsResponce, API.playlistQuery())
        }
    }
    return (
        <section className="spoty-section">
            <div className="text-content" onClick={onNameClick}>{props.text}</div>
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