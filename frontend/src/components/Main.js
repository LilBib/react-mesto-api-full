import React from "react"
import Card from "./Card"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
function Main (props) {
    const currentUser=React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                    <div style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="Аватар профиля" className="profile__avatar" />
                </div>
                <div className="profile__content">
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        <h2 className="profile__description">{currentUser.about}</h2>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
                </div>
            </section>
            <section className="elements">
                {props.cards.map(card => (<Card card={card} onClick={props.onCardClick} onLikeClick={props.onCardLike} onDeleteClick={props.onCardDelete} key={card._id} />))}
            </section>
        </main>
    )
}

export default Main