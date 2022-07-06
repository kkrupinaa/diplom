import playButton from "./play-button.svg"
import pauseButton from "./pause.svg"
import React, { useContext, useRef, useState } from "react"
import { IFooter } from "./interfaces"
import { CommonContext, FooterContext } from "../Context"
import { IMusic } from "./interfaces"
export default React.memo(function MusicBox(props: IMusic) {
    const [playState, setPlayState] = useState(playButton)
    const refContainer = useRef<HTMLImageElement>(null)
    let setFooterStyle = useContext(FooterContext)
    const [prevTrack, setPrevTrack] = useContext(CommonContext)
    let curPlay = refContainer.current as HTMLImageElement
    /**
     *Управление кнопкой включить/выключить
     */
    function onPlayClick() {
        const newFooter: IFooter = {
            firstTitle: props.first_title,
            secondTitle: props.second_title,
            photo: props.photo,
            liked: false
        }
        if (playState === playButton) {
            setPlayState(pauseButton)
            setFooterStyle(newFooter)
            setPrevTrack(curPlay)
            prevTrack.src = playButton
        }
        else setPlayState(playButton)
        localStorage.setItem('footerStyle', JSON.stringify(newFooter))
    }
    return (
        <div className="music-box" data-id={props.id}>
            <div className="album">
                <div className="photo">
                    <div className="album_photo">
                        <img className="photo-style" alt="album" src={props.photo} height="148px" />
                    </div>
                    <img className="hidden-img" alt="play" src={playState} ref={refContainer} onClick={onPlayClick} />
                </div>
                <div className="first-title">{props.first_title}</div>
                <div className="second-title">{props.second_title}</div>
            </div>
        </div>
    )
}, (prevProps, nextProps) => {
    if (prevProps !== nextProps)
        return false
    else return true
},
)