import PopupWithForm from "./PopupWithForm";
import React from "react";

function DeletePopup (props) {    

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard(props.card);
        props.onClose();
    }

    return (
        <PopupWithForm 
        name='delete-card' 
        title='Удалить карточку?' 
        value='Да' 
        isOpen={props.isOpen} 
        onClose={props.onClose}
        onSubmit={handleSubmit}
        />
    )
}

export default DeletePopup;