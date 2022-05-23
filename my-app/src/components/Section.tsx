import { IMusic } from "../interfaces";
import MusicBox from "./MusicBox";

export default function Section(props:{text:string, musicBoxList:IMusic[]}){
    return(
    <section className="spoty-section">
        <div className="text-content">{props.text}</div>
        <div className="grid-content">
            {
                props.musicBoxList.map((item)=>(
                    <MusicBox photo={item.photo} footer_photo={item.footer_photo} first_title={item.first_title} second_title={item.second_title} key={item.id} id={item.id}/>
                ))
            }
        </div>
    </section>
    )
}