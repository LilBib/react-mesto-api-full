import logo from './../images/_logo.svg';
import {Link} from 'react-router-dom';
function Header({path, email, onLogOut}) {
    if (path==="/")
    return (
        <header className="header">
            <img src={logo} alt="Лoготип проекта Место" className="header__logo"/>
            <div className='header__logged-in-units'>
                <p className='header__current-email'>{email}</p>
                <p className='header__logout-button' onClick={onLogOut}>Выйти</p>
            </div>
        </header>
    )
    if (path === "/sign-up")
    return (
        <header className="header">
            <img src={logo} alt="Лoготип проекта Место" className="header__logo"/>
            <Link to="/sign-in" className='header__link'>Войти</Link>
        </header>
    )
    if (path === "/sign-in")
    return (
        <header className="header">
            <img src={logo} alt="Лoготип проекта Место" className="header__logo"/>
            <Link to="/sign-up" className='header__link'>Регистрация</Link>
        </header>
    )
}
export default Header