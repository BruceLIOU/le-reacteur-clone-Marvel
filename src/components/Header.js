import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
/* import SearchFilters from "./SearchFilters"; */
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";

/* import SwitchSort from "./SwitchSort"; */

const Header = ({ apiUrl, userToken, setUser, setValue }) => {
  /* const [sort, setSort] = useState("title-desc"); */

  const [hideLoginModal, setHideLoginModal] = useState(true);
  const [hideSignUpModal, setHideSignUpModal] = useState(true);

  const location = useLocation();
  const history = useHistory();

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  return (
    <div className="header">
      <div className="logo">
        <div className="credentials">
          {!userToken && (
            // Not displayed to logged in users and on sign up page
            <div
              className="btn white-btn"
              onClick={() => {
                setHideSignUpModal(false);
              }}
            >
              REGISTER
            </div>
          )}
          {userToken ? (
            // Displayed when user is logged in
            <div
              className="btn red-btn logout"
              onClick={() => {
                setUser(null);
                history.push("/");
              }}
            >
              LOGOUT
            </div>
          ) : (
            // Displayed when user isn't logged in and not on login page
            location.pathname !== "/login" && (
              <div
                className="btn white-btn"
                onClick={() => {
                  setHideLoginModal(false);
                }}
              >
                LOGIN
              </div>
            )
          )}
        </div>
        <Link to="/">
          <img src={logo} alt="Marvel logo" />
        </Link>
      </div>

      <div className="nav">
        <ul>
          <Link to="/characters">Characters</Link>
          <Link to="/comics">Comics</Link>
          {userToken && <Link to="/favorites">Favorites</Link>}
        </ul>
        {location.pathname !== "/" && (
          <div className="search-bar-container">
            <div className="search-bar">
              <FontAwesomeIcon icon="search" />
              <input
                type="search"
                placeholder="Search anything"
                onChange={handleChange}
              />
            </div>

            {/*           {location.pathname !== "/" && (
            <div className="sort">
              <SwitchSort setSort={setSort} />
            </div>
          )} */}
          </div>
        )}
      </div>
      <LoginModal
        hideLoginModal={hideLoginModal}
        setUser={setUser}
        setHideLoginModal={setHideLoginModal}
        apiUrl={apiUrl}
        userToken={userToken}
      />
      <SignUpModal
        hideSignUpModal={hideSignUpModal}
        setUser={setUser}
        setHideSignUpModal={setHideSignUpModal}
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default Header;
