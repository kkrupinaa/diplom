import { useState } from 'react';
import Like from './icons/Like';
import LikeActive from './icons/LikeActive';
import { IFooter } from './interfaces';
type FooterProps={
    footerStyle:IFooter
}
export default function Footer(props: FooterProps) {
    const [isLiked, setIsLiked] = useState(false)
    function onLike() {
        setIsLiked(!isLiked)
    }
    return (
        <footer className="spoty__footer">
            <div className="left-item">
                <img className='footer__photo' alt="current music" src={props.footerStyle.photo} width="56px" height="56px" />
                <div className="footer__title">
                    <div className="footer__title__album">
                        {
                            props.footerStyle.firstTitle
                        }
                    </div>
                    <div className="footer__title__artist">
                        {
                            props.footerStyle.secondTitle
                        }
                    </div>
                </div>
                <button className="like-button" aria-label="Добавить в медиатеку" onClick={onLike} >
                    <div className="menu-icon">
                        {
                            isLiked
                                ? <LikeActive />
                                : <Like />
                        }
                    </div>
                </button>
            </div>
        </footer>
    )
}