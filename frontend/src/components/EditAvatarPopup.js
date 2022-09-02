import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup (props) {    
    const linkRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(linkRef.current.value);
        linkRef.current.value='';
    }

    return (
        <PopupWithForm 
        name='avatar-edit' 
        title='Обновить Аватар' 
        value='Сохранить' 
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            <input id="avatar-link-input" name="link" required placeholder="Ссылка на картинку" type="url" className="form__item form__item_section_link" ref={linkRef} />
            <span className="avatar-link-input-error form__item-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;