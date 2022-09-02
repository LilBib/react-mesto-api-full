import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPopup from "./AddPopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isDeletePopupOpen, setDeletePopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupState] = useState(false);
  const [isSignUpSucceed, setSignUpSuccessState] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("example@yandex.com");
  const [isLoggedIn, setLogInState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: "1" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser({ _id: `${data._id}` });
          setCurrentUserEmail(data.email);
          setLogInState(true);
        })
        .catch((err) => {
          console.log(err);
          setCurrentUser({ _id: ` ` });
          setCurrentUserEmail(" ");
          setLogInState(false);
        });
    }
  }, []);
  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err));
    }
  }, [isEditAvatarPopupOpen, isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const deleteCard = useCallback(
    (card) => {
      const isOwner = card.owner._id === currentUser._id;

      if (isOwner) {
        api
          .deleteCard(card._id)
          .then(() => {
            setCards((cards) => cards.filter((c) => c._id !== card._id));
          })
          .catch((err) => console.log(err));
      }
    },
    [currentUser._id]
  );

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .like(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .unlike(card._id)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupState(true);
  };
  const handleEditProfileClick = () => {
    setEditProfilePopupState(true);
  };
  const handleAddPlaceClick = () => {
    setAddPopupState(true);
  };
  const handleDeleteButtonClick = () => {
    setDeletePopupState(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupState(true);
  };
  const handleUpdateUser = (name, description) => {
    api
      .patchUserInfo(name, description)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (link) => {
    api.patchAvatarInfo(link).catch((err) => console.log(err));
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleAddCard = (name, link) => {
    api
      .postNewCard(name, link)
      .then((newCard) => {
        if (cards[0]) {
          setCards([newCard, ...cards])
        } setCards([newCard])
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleSignIn = (password, email) => {
    api
      .signin(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLogInState(true);
        setCurrentUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
        setSignUpSuccessState(false);
        setInfoToolTipPopupState(true);
      });
  };

  const handleSignUp = (password, email) => {
    api
      .signup(password, email)
      .then(() => {
        setSignUpSuccessState(true);
        setInfoToolTipPopupState(true);
      })
      .then(() => {
        navigate('/sign-in',{replace:true})
      })
      .catch((err) => {
        console.log(err);
        setSignUpSuccessState(false);
        setInfoToolTipPopupState(true);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({ _id: "" });
    setCurrentUserEmail("");
    setLogInState(false);
  };

  const closeAllPopups = () => {
    setAddPopupState(false);
    setDeletePopupState(false);
    setEditAvatarPopupState(false);
    setEditProfilePopupState(false);
    setImagePopupState(false);
    setInfoToolTipPopupState(false);
    setSelectedCard({ link: "1" });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <>
                <Header path={"/sign-up"} />
                <Register onSignUp={handleSignUp} />
              </>
            }
          ></Route>
          <Route
            path="/sign-in"
            element={
              <>
                <Header path={"/sign-in"} />
                <Login onLogin={handleSignIn} isLoggedIn={isLoggedIn} />
              </>
            }
          ></Route>
        </Routes>
        <ProtectedRoute path="/" loggedIn={isLoggedIn}>
          <>
            <Header
              path={"/"}
              email={currentUserEmail}
              onLogOut={handleLogOut}
            />
            <Main
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onDeleteButton={handleDeleteButtonClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={deleteCard}
            />
            <Footer />
          </>
        </ProtectedRoute>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          value="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isSucceed={isSignUpSucceed}
          name="info-tool-tip"
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
