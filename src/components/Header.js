import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
/* import SearchFilters from "./SearchFilters"; */
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";

import SwitchSort from "./SwitchSort";

const Header = ({ apiUrl, currentUser, userToken, setData, limit, page }) => {
  const history = useHistory();
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [hideLoginModal, setHideLoginModal] = useState(true);
  const [hideSignUpModal, setHideSignUpModal] = useState(true);
  const [sort, setSort] = useState("title-desc");

  return (
    <div className="header">
      <div className="logo">
        <div className="credentials">
          {!userToken && location.pathname !== "/signup" && (
            <Link
              to="/signup"
              onClick={() => {
                setHideSignUpModal(false);
              }}
            >
              SignUp
            </Link>
          )}
          {userToken ? (
            <Link
              to="/logout"
              onClick={() => {
                currentUser(null);
                history.push("/");
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => {
                setHideLoginModal(false);
              }}
            >
              Login
            </Link>
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
          <Link to="/favorites">Favorites</Link>
        </ul>

        <div className="search-bar-container">
          <div className="search-bar">
            <FontAwesomeIcon icon="search" />
            <input
              type="search"
              placeholder="Search anything"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          {location.pathname !== "/" && (
            <div className="sort">
              <SwitchSort sort={sort} setSort={setSort} />
            </div>
          )}
        </div>
      </div>
      <LoginModal
        hideLoginModal={hideLoginModal}
        currentUser={currentUser}
        setHideLoginModal={setHideLoginModal}
        apiUrl={apiUrl}
      />
      <SignUpModal
        hideSignUpModal={hideSignUpModal}
        currentUser={currentUser}
        setHideSignUpModal={setHideSignUpModal}
        apiUrl={apiUrl}
      />
    </div>
  );
};

export default Header;
