import { MusicBox } from "./musicbox.js";
/**
 *Обновить данные о текущем трекев footer
 * @param first_title название текущего трэка
 * @param second_title автор трэка
 * @param footer_photo фото
 */
function updateFooter(first_title:string,second_title:string,footer_photo:string){
    let root=document.querySelector('.footer__title__album')
    root?.remove()
    root=document.querySelector('.footer__title__artist')
    root?.remove()
    root=document.querySelector('.footer__title')
    root?.insertAdjacentHTML('beforeend',`<div class='footer__title__album'style="color: white; font-size:14px">${first_title}</div>`)
    root?.insertAdjacentHTML('beforeend',`<div class='footer__title__artist'style="color:#b3b3b3;font-size:11px">${second_title}</div>`)
    let photo_root=document.querySelector('.footer__photo') as HTMLImageElement
    photo_root.src=footer_photo
}
/**
 * Список альбомов
 */
export class MusicBoxList{
    container:HTMLElement
    constructor(container:HTMLElement){
        this.container=container
    }
    /**
     * Добавить альбом
     * @param photo фото
     * @param first_title название альбома
     * @param second_title имя исполнителя
     * @param tracks список треков в альбоме
     */
    add(photo:string,first_title:string,second_title:string,tracks:JSON,footer_photo:string):void{
        const NewMusicBox= new MusicBox(photo,first_title,second_title,tracks,footer_photo)
        const template = MusicBox.template(NewMusicBox)
        this.container.insertAdjacentHTML('beforeend',template)
        // Add event listener to play/pause track
        const list=this.container.querySelectorAll('.hidden-img') as NodeListOf<HTMLImageElement>
        const elem=list[list.length-1] as HTMLImageElement
        
        elem.addEventListener('click',()=>{
            if (elem.src=='http://localhost:3000/play-button.svg'){
                const all_buttons=document.querySelectorAll('.hidden-img') as NodeListOf<HTMLImageElement>
                for (let i=0;i<all_buttons.length;i++){
                    all_buttons[i].src='./play-button.svg'
                }
                elem.src='./pause.svg'
        }
            else elem.src='./play-button.svg'
            updateFooter(first_title,second_title,footer_photo)
    })
}
    /**
     * Очистить список
     */
    deleteAll(){
        while(this.container.firstChild){
            this.container.removeChild(this.container.firstChild)
        }
}
}