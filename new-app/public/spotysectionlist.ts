import { SpotySection } from "./section.js"

/**
 * Список секций
 */
export class SpotySectionList{
    container:HTMLElement
    constructor(container:HTMLElement){
        this.container=container
    }
    /**
     * Добавить новую сукцию
     * @param text Заголовок
     * @returns новая секция
     */
    add(text:string):SpotySection{
        const NewSpotySection= new SpotySection(text)
        const template = SpotySection.template(NewSpotySection)
        this.container.insertAdjacentHTML('beforeend',template)
        return NewSpotySection
    }
}