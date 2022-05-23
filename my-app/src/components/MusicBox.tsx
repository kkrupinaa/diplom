import  play_button from "./play-button.svg"
export default function MusicBox(props:{photo:string,first_title:string, second_title:string,footer_photo:string,id:string}){
    return(
        <div className="music-box" data-id={props.id}>
            <div className="album">
                <div className="photo">
                    <div className="album_photo">
                        <img className="photo-style" src={props.photo} height="148px"/>
                    </div>
                    <img className="hidden-img"src={play_button}/>
                </div>
                    <div className="first-title">{props.first_title}</div>
                    <div className="second-title">{props.second_title}</div>
            </div>
        </div>
    )
}