import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPopup from "./AddPopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import DeletePopup from "./DeletePopup";

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
  const [currentCardOnDelete, setCurrentCardOnDelete] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      api
        .getUserInfo(localStorage.getItem("jwt"))
        .then((data) => {
          setCurrentUser(data);
          setCurrentUserEmail(data.email);
          setLogInState(true);
        })
        .catch((err) => {
          console.log(err);
          setCurrentUser({ _id: ` ` });
          setCurrentUserEmail(" ");
        });
    }
  },[isLoggedIn]);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getInitialCards(localStorage.getItem("jwt"))
        .then((res) => {
          setCards(res.data.reverse());
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  function handleDeleteCard (card) {
    api
      .deleteCard(card._id, localStorage.getItem("jwt"))
      .then(() => {
        api
          .getInitialCards(localStorage.getItem("jwt"))
          .then((res) => {
            setCards(res.data.reverse());
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .like(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard.data : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .unlike(card._id, localStorage.getItem("jwt"))
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard.data : c))
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
  const handleDeleteButtonClick = (card) => {
    setCurrentCardOnDelete(card);
    setDeletePopupState(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupState(true);
  };
  const handleUpdateUser = (name, description) => {
    api
      .patchUserInfo(name, description, localStorage.getItem("jwt"))
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (link) => {
    api.patchAvatarInfo(link, localStorage.getItem("jwt")).catch((err) => console.log(err));
    api
      .getUserInfo(localStorage.getItem("jwt"))
      .then((res) => setCurrentUser(res))
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleAddCard = (name, link) => {
    api
      .postNewCard(name, link, localStorage.getItem("jwt"))
      .then((newCard) => {
        setCards([newCard.data, ...cards])
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const handleSignIn = (password, email) => {
    api
      .signin(password, email)
      .then((data) => {
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt", data.token);
        setLogInState(true);
        setCurrentUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
        setSignUpSuccessState(false);
        setInfoToolTipPopupState(true);
      });
    api
      .getUserInfo(localStorage.getItem("jwt"))
      .then(user=>setCurrentUser(user))
      .catch(err=>console.log(err))
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
    setCurrentUser({});
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
    setCurrentCardOnDelete({});
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
              isLoggedIn={isLoggedIn}
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

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          card={currentCardOnDelete}
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
