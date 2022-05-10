/**
 * Тематическая секция
 */
export class SpotySection {
    constructor(text) {
        this.text = text;
        this.id = '${Date.now()}_${Math.floor(Math.random() * 1000)}';
    }
    /**
     * HTML представления
     * @param spotysection экземпляр SpotySection
     * @returns HTML представление экземпляра класса
     */
    static template(spotysection) {
        return `
    <section class="spoty-section">
        <div class="text-content">${spotysection.text}</div>
        <div class="grid-content"></div>
    </section>`;
    }
}
//# sourceMappingURL=section.js.map