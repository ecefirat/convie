import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

function Header(props) {
  return (
    // <div className="navbar-fixed">
    <nav>
      <div className="nav-wrapper navbar-fixed amber darken-1">
        <Link to="/" className="brand-logo">
          <img
            src="http://localhost:5000/uploads/logo.jpeg"
            alt="logo"
            width="60px"
            height="55px"
          />
        </Link>
        {/* <img
          src="http://localhost:5000/uploads/logo.jpeg"
          alt="logo"
          width="45px"
          height="45px"
        /> */}
        <DarkMode />
        {/* <img src="logo.jpeg" alt="" width="30px" height="30" /> */}
        {/* <ul className="nav-mobile right">
            <li>
              <Link to="/profile">{props.profile}</Link>
            </li>
            <li>
              <Link to="/register">{props.register}</Link>
            </li>
            <li>
              <Link to="/login">{props.login}</Link>
            </li>
            <li>
              <Link to="/basket">{props.basket}</Link>
            </li>
          </ul> */}
      </div>
    </nav>
    // </div>
  );
}

export default Header;
