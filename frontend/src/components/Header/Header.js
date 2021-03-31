import React from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Header(props) {
  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper amber darken-1">
          <Link to="/" className="brand-logo left">
            Convie
          </Link>
          <ul id="nav-mobile" className="right">
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
            {/* <li>
            <a href="/profile">{props.profile}</a>
          </li>
          <li>
            <a href="/register">{props.register}</a>
          </li>
          <li>
            <a href="/login">{props.login}</a>
          </li>
          <li>
            <a href="/basket">{props.basket}</a>
            <Route path="/basket">
              <Basket />
            </Route>
            <Link to="/basket"><img src={Basket} alt=""></img></Link>
          </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
