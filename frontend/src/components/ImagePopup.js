import errorImg from '../images/imgonerror.png'
import React from "react"
function ImagePopup ({ card, isOpen,  onClose }) {
    const imgRef = React.useRef()
    React.useEffect(() => {

        const closeByEscape = (e) => {
            if ( e.key === 'Escape' ) {
                onClose();
            }
        }

        if(isOpen){window.addEventListener('keydown', closeByEscape)}
        return(()=>{window.removeEventListener('keydown', closeByEscape)})
    },[onClose, isOpen])

    const handleError = () => {
        imgRef.current.src=errorImg
    }

    const closeByCLick = (e) => {
        if ( e.target.classList.contains('popup') ) {
            onClose();
        }
    }
    
    return (
        <div className={`popup ${isOpen?'popup_opened':''} popup_assignment_card `} onClick={closeByCLick}>
            <div className="popup__container popup__container_assignment_card">
                <button type="button" className="popup__close-icon" onClick={onClose}></button>
                <img ref={imgRef} src={card.link} className="popup__image" alt={card.name} onError={handleError} />
                <p className="popup__caption"></p>
            </div>
        </div>
    )
}
export default ImagePopup;