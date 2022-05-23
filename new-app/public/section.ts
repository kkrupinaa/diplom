import { MusicBoxList } from "./musicboxlist"

/**
 * Тематическая секция
 */
export class SpotySection{
    text:string
    private id:string
    constructor(text:string){
        this.text=text
        this.id='${Date.now()}_${Math.floor(Math.random() * 1000)}'
    }
    /**
     * HTML представления
     * @param spotysection экземпляр SpotySection
     * @returns HTML представление экземпляра класса
     */
    static template(spotysection:SpotySection):string{
        return `
    <section class="spoty-section">
        <div class="text-content">${spotysection.text}</div>
        <div class="grid-content"></div>
    </section>`
    }
}