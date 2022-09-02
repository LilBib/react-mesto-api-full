import {Link} from 'react-router-dom';
import React from 'react';

function Register (props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange (e) {
        setEmail(e.target.value)
    }
    function handlePasswordChange (e) {
        setPassword(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onSignUp(password,email);
    }
    return (
        <form name={`register-form`} className={`form form_task_register`} noValidate onSubmit={handleSubmit}>
            <h2 className={`form__title form__title_theme_black form__title_task_register`}>Регистрация</h2>
            <input id="email" name="email" required minLength="2" maxLength="40" placeholder="Email" type="email" className="form__item form__item_theme_black form__item_section_email" onChange={handleEmailChange} />
            <span className="email-error form__item-error"></span>
            <input id="password" name="password" minLength="2" maxLength="200" placeholder="Пароль" required type="password" className="form__item form__item_theme_black form__item_section_password" onChange={handlePasswordChange} />
            <span className="password-error form__item-error"></span>
            <input name="submit-button" type="submit" value='Зарегестрироваться' className="form__button form__button_theme_black form__button_type_register"/> 
            <Link to="/sign-in" className='form__reg-link'>Уже зарегестрированы? Войти</Link>
        </form>
    )
}

export default Register;