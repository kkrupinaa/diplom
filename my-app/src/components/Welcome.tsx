import { Link } from "react-router-dom"
import { API } from "./API/API"
export default function Welcome() {
    return (
        <main className="content">
            <header className="spoty__header">
                <button className="spoty__header__button" onClick={API.requestAuthorization}>
                    <Link to='/callback' className="auth-button">     Авторизация     </Link>
                </button>
                <div className="hidden-bar"></div>
            </header>
            <div className="welcome-text">
                <div>Добро пожаловать!</div>
                <div>Чтобы авторизоваться:</div>
                <div>1. Нажмите на кнопку "Авторизация"</div>
                <div>2. Введите логин/пароль своего аккаунта Spotify, нажмите "Принять"</div>
                <div>3. Перезагрузите страницу</div>
            </div>
        </main>
    )
}