import { useContext } from "react"
import { sectionContext } from "../Context"
import Section from "./Section"

export default function Media(){
    let mediaSections=useContext(sectionContext)
    return(
        <main className="content">
        <header className="spoty__header">
            <div className="hidden-bar"></div>
        </header>
        <div className="content-spacing">
            {
                mediaSections.map((item)=>(
                    <Section text={item.text} musicBoxList={[]} key={item.id} id={item.id}/>
                ))
            }
        </div>
    </main>
    )
}