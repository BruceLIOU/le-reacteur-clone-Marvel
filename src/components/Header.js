import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
/* import SearchFilters from "./SearchFilters"; */
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SwitchSort from "./SwitchSort";

const Header = ({ modal, setModal, userToken, setUser }) => {
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("title-desc");

  const location = useLocation();
  const history = useHistory();

  return (
    <div className="header">
      <div className="logo">
        <div className="credentials">
          {userToken === null ? (
            <button
              onClick={() => {
                setModal(!modal);
              }}
            >
              REGISTER / LOGIN
            </button>
          ) : (
            <button
              onClick={() => {
                setUser(null);
                history.push("/");
              }}
            >
              LOGOUT
            </button>
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
    </div>
  );
};

export default Header;
