import React, { useState } from "react";
import { API } from "./API/API";
import { musicList, Playlist } from "./classes";
import {ISection } from "./interfaces";
import MusicBox from "./MusicBox";

export default function SectionPlaylist(props: ISection) {
    const [curMusic, setCurMusic] = useState(props.musicBoxList)
    function onNameClick() {
        if (props.href !== '') {
            API.fetchApi(props.href + '/tracks', API.UseAPI(new musicList(setCurMusic,new Playlist())), API.playlistQuery())
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