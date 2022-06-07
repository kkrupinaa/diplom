import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "./Spotify_Logo_RGB_White.png"
export default function Accordion(){
    const [homeState,setHomeState]=useState<boolean>(true)
    const [searchState,setSearchState]=useState<boolean>(false)
    const [mediaState,setMediaState]=useState<boolean>(false)
    function onSearchClick(){
        setSearchState(true)
        setHomeState(false)
        setMediaState(false)
    }
    function onHomeClick(){
        setHomeState(true)
        setSearchState(false)
        setMediaState(false)
    }
    function onMediaClick(){
        setMediaState(true)
        setHomeState(false)
        setSearchState(false)
    }
    return(
        <aside className="accordion-left">
        <nav aria-label="Main-menu">
            <div className="logo">
                <img src={logo} alt="spotify-logo" width="131px" height="40px"/>
            </div>
            <ul className="menu">
                <li>
                    <Link to='/callback' className="menu__elem" onClick={onHomeClick}>
                        <div className="menu-icon">
                            {homeState
                                ?<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 jgfuCe home-active-icon" viewBox="0 0 24 24"><path d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"/></svg>
                                :<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 jgfuCe home-icon" viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
                            }
                        </div>
                        Главная
                    </Link>
                </li>
                <li>
                    <Link to='/search' className="menu__elem" onClick={onSearchClick}>
                        <div className="menu-icon">
                            {searchState
                                    ?<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 jgfuCe search-active-icon" viewBox="0 0 24 24"><path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75z"></path><path d="M1.126 10.558c0-5.14 4.226-9.28 9.407-9.28 5.18 0 9.407 4.14 9.407 9.28a9.157 9.157 0 01-2.077 5.816l4.344 4.344a1 1 0 01-1.414 1.414l-4.353-4.353a9.454 9.454 0 01-5.907 2.058c-5.18 0-9.407-4.14-9.407-9.28zm9.407-7.28c-4.105 0-7.407 3.274-7.407 7.28s3.302 7.279 7.407 7.279 7.407-3.273 7.407-7.28c0-4.005-3.302-7.278-7.407-7.278z"></path></svg>
                                    :<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 hDgDGI search-icon" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/></svg>
                            }
                        </div>
                        Поиск
                    </Link>
                </li>
                <li>
                    <Link to='/media' className="menu__elem" onClick={onMediaClick}>
                        <div className="menu-icon">
                            {mediaState
                                ?<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 jgfuCe collection-active-icon" viewBox="0 0 24 24"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001 1h6a1 1 0 001-1V6.464a1 1 0 00-.5-.866l-6-3.464zM9 2a1 1 0 00-1 1v18a1 1 0 102 0V3a1 1 0 00-1-1z"></path></svg>
                                :<svg xmlns="http://www.w3.org/2000/svg" role="img" className="Svg-sc-1bi12j5-0 hDgDGI collection-icon" viewBox="0 0 24 24"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"/></svg>
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