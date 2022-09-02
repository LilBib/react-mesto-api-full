import React from "react";

function PopupWithForm (props) {
    React.useEffect(() => {

        const closeByEscape = (e) => {
            if ( e.key === 'Escape' ) {
                props.onClose();
            }
        }

        if(props.isOpen){window.addEventListener('keydown', closeByEscape)}
        return(()=>{window.removeEventListener('keydown', closeByEscape)})
    },[props])

    const closeByCLick = (e) => {
        if ( e.target.classList.contains('popup') ) {
            props.onClose();
        }
    }
    
    return (
        <div className={`popup popup_assignment_${props.name} ${props.isOpen?'popup_opened':''}`} onClick={closeByCLick} >
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <form name={`${props.name}-form`} className={`form form_task_${props.name}`} noValidate  onSubmit={props.onSubmit}>
                    <h2 className={`form__title form__title_task_${props.name}`}>{props.title}</h2>
                    {props.children}
                    <input name="submit-button" type="submit" value={props.value || ''} className="form__button form__button_type_avatar-edit"/> 
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;