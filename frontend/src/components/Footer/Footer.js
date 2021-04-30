import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <nav className="nav-wrapper amber darken-1">
      {/* <div className="nav-wrapper amber darken-1"> */}
      <ul className="nav-mobile ">
        <li>
          <Link to="/">
            <i className="material-icons">home</i>
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="material-icons">account_circle</i>
          </Link>
        </li>
        <li>
          <Link to="/history">
            <i className="material-icons">history</i>
          </Link>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
}

export default Footer;
