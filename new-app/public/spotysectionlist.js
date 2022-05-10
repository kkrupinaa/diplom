import { SpotySection } from "./section.js";
/**
 * Список секций
 */
export class SpotySectionList {
    constructor(container) {
        this.container = container;
    }
    /**
     * Добавить новую сукцию
     * @param text Заголовок
     * @returns новая секция
     */
    add(text) {
        const NewSpotySection = new SpotySection(text);
        const template = SpotySection.template(NewSpotySection);
        this.container.insertAdjacentHTML('beforeend', template);
        return NewSpotySection;
    }
}
//# sourceMappingURL=spotysectionlist.js.map