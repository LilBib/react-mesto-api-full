import React from "react";
import errorImg from '../images/imgonerror.png'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({ card, onClick, onLikeClick, onDeleteClick }) {
    const currentUser=React.useContext(CurrentUserContext);
    const imgRef=React.useRef();
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isOwner = card.owner._id === currentUser._id;
    function handleCardClick (evt) {
        if (evt.target.classList.contains('element__card'))
        onClick(card)
        }
    function handleLikeClick () {
        onLikeClick(card)
    }
    function handleDeleteButtonClick () {
        onDeleteClick(card);
    }
    const handleError = () => {
        imgRef.current.src=errorImg
    }
    
    return(
        <div className="element" onClick={handleCardClick}>
            <img ref={imgRef} src={card.link || errorImg} alt={card.name} onError={handleError} className="element__card" />
            <div className="element__content">
                <h2 className="element__description">{card.name}</h2>
                <div className="element__like-column" onClick={handleLikeClick}>
                    <button type="button" className={`${isLiked?'element__like-button element__like-button_active':'element__like-button'}`}></button>
                    <h2 className="element__like-count">{card.likes.length}</h2>
                </div>
                <button type="button" onClick={handleDeleteButtonClick} className={`${isOwner?"element__delete-button":"element__delete-button_disabled"}`}></button>
            </div>
        </div>
    )
}
export default Card;