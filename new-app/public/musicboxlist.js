import { MusicBox } from "./musicbox.js";
/**
 * Список альбомов
 */
export class MusicBoxList {
    constructor(container) {
        this.container = container;
    }
    /**
     * Добавить альбом
     * @param photo фото
     * @param first_title название альбома
     * @param second_title имя исполнителя
     * @param tracks список треков в альбоме
     */
    add(photo, first_title, second_title, tracks) {
        const NewMusicBox = new MusicBox(photo, first_title, second_title, tracks);
        const template = MusicBox.template(NewMusicBox);
        this.container.insertAdjacentHTML('beforeend', template);
        // Add event listener to play/pause track
        const list = this.container.querySelectorAll('.hidden-img');
        const elem = list[list.length - 1];
        elem.addEventListener('click', () => {
            if (elem.src == 'http://localhost:3000/play-button.svg') {
                const all_buttons = document.querySelectorAll('.hidden-img');
                for (let i = 0; i < all_buttons.length; i++) {
                    all_buttons[i].src = './play-button.svg';
                }
                elem.src = './pause.svg';
            }
            else
                elem.src = './play-button.svg';
        });
    }
    /**
     * Очистить список
     */
    deleteAll() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}
//# sourceMappingURL=musicboxlist.js.map