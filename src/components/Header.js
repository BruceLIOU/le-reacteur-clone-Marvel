import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
/* import SearchFilters from "./SearchFilters"; */
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";

import SwitchSort from "./SwitchSort";

const Header = () => {
  const location = useLocation();

  const [searchInput, setSearchInput] = useState("");
  const [hideLoginModal, setHideLoginModal] = useState(true);
  const [hideSignUpModal, setHideSignUpModal] = useState(true);
  const [sort, setSort] = useState("title-desc");

  return (
    <div className="header">
      <div className="logo">
        <div className="credentials">
          <Link
            to="/signup"
            onClick={() => {
              setHideSignUpModal(false);
            }}
          >
            SignUp
          </Link>
          <Link
            to="/login"
            onClick={() => {
              setHideLoginModal(false);
            }}
          >
            Login
          </Link>
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
        setHideLoginModal={setHideLoginModal}
      />
      <SignUpModal
        hideSignUpModal={hideSignUpModal}
        setHideSignUpModal={setHideSignUpModal}
      />
    </div>
  );
};

export default Header;
