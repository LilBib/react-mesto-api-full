import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
    const currentUser=React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [description, setDescription] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser,props.isOpen]);

    function handleNameChange (e) {
        setName(e.target.value)
    }
    function handleDescriptionChange (e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm 
        name='edit' 
        title='Редактировать профиль'
        value='Сохранить'
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
            <input id="profile-name" name="name" required minLength="2" maxLength="40" placeholder="Ваш никнейм" type="text" className="form__item form__item_section_name" defaultValue={name} onChange={handleNameChange} />
            <span className="profile-name-error form__item-error"></span>
            <input id="profile-description" name="description" minLength="2" maxLength="200" placeholder="Описание профиля" required type="text" className="form__item form__item_section_description" value={description || ""} onChange={handleDescriptionChange} />
            <span className="profile-description-error form__item-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup