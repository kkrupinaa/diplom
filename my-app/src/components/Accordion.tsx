import { useState } from "react"
import { Link } from "react-router-dom"
import HomeActiveIcon from "./icons/HomeActiveIcon"
import HomeIcon from "./icons/HomeIcon"
import MediaActiveIcon from "./icons/MediaActiveIcon"
import MediaIcon from "./icons/MediaIcon"
import SearchActiveIcon from "./icons/SearchActiveIcon"
import SearchIcon from "./icons/SearchIcon"
import logo from "./Spotify_Logo_RGB_White.png"
export default function Accordion() {
    const [homeState, setHomeState] = useState<boolean>(true)
    const [searchState, setSearchState] = useState<boolean>(false)
    const [mediaState, setMediaState] = useState<boolean>(false)
    function onSearchClick() {
        setSearchState(true)
        setHomeState(false)
        setMediaState(false)
    }
    function onHomeClick() {
        setHomeState(true)
        setSearchState(false)
        setMediaState(false)
    }
    function onMediaClick() {
        setMediaState(true)
        setHomeState(false)
        setSearchState(false)
    }
    return (
        <aside className="accordion-left">
            <nav aria-label="Main-menu">
                <div className="logo">
                    <img src={logo} alt="spotify-logo" width="131px" height="40px" />
                </div>
                <ul className="menu">
                    <li>
                        <Link to='/callback' className="menu__elem" onClick={onHomeClick}>
                            <div className="menu-icon">
                                {homeState
                                    ? <HomeActiveIcon />
                                    : <HomeIcon />
                                }
                            </div>
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link to='/search' className="menu__elem" onClick={onSearchClick}>
                            <div className="menu-icon">
                                {searchState
                                    ? <SearchActiveIcon />
                                    : <SearchIcon />
                                }
                            </div>
                            Поиск
                        </Link>
                    </li>
                    <li>
                        <Link to='/media' className="menu__elem" onClick={onMediaClick}>
                            <div className="menu-icon">
                                {mediaState
                                    ? <MediaActiveIcon />
                                    : <MediaIcon />
                                }
                            </div>
                            Моя медиатека
                        </Link>
                    </li>
                </ul>
                <ul className="menu__playlist">
                    <li className="menu__elem">Создать плейлист</li>
                    <li className="menu__elem">Любимые треки</li>
                </ul>
            </nav>
        </aside>
    )
}