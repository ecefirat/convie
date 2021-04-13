import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper amber darken-1">
          <Link to="/" className="brand-logo left">
            Convie
          </Link>
          <ul className="nav-mobile right">
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
              <Link to={{ basket: "/basket", state: { message: "hey heyyy" } }}>
                {props.basket}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
