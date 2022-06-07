/**
 * Альбом
 */
export class MusicBox {
    constructor(photo, first_title, second_title, tracks, footer_photo) {
        this.id = '${Date.now()}_${Math.floor(Math.random() * 1000)}';
        this.photo = photo;
        this.first_title = first_title;
        this.second_title = second_title;
        this.tracks = tracks;
        this.footer_photo = footer_photo;
    }
    /**
     * HTML представление
     * @param musicbox экземпляр MusicBox
     * @returns HTML представление экземпляра класса MusicBox
     */
    static template(musicbox) {
        return `
        <div class="music-box" data-id=${musicbox.id}>
            <div class="album">
                <div class="photo">
                  <div class="album_photo">
                    <img src=${musicbox.photo} height="148px" style="box-shadow: 0px 0px 25px 2px #000; align-self:center">
                  </div>
                <img class="hidden-img"src="./play-button.svg" width="48px"height=48px>
                </div>
                <div class="first-title">${musicbox.first_title}</div>
                <div class="second-title">${musicbox.second_title}</div>
            </div>
        </div>
        `;
    }
}
//# sourceMappingURL=musicbox.js.map