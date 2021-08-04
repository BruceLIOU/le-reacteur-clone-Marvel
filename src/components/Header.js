import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchFilters from "./SearchFilters";
import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="./assets/img/logo.png" alt="" />
      </div>
      <div className="nav">
        <ul>
          <li>
            <a href="/characters" rel="noreferrer">
              Characters
            </a>
          </li>
          <li>
            <a href="/comics" rel="noreferrer">
              Comics
            </a>
          </li>
          <li>
            <a href="/favorites" rel="noreferrer">
              Favorites
            </a>
          </li>
        </ul>
        <div className="credentials">
          <button className="login">Login</button>
          <button className="login">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
