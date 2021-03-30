import React from "react";

function Footer() {
  return (
    // <footer classNameName="page-footer amber darken-1">
    //         All rights reversed.
    // </footer>
    <div className="footer">
      <footer>
        <nav className="amber darken-1">
          <div className="nav-wrapper footer-margin">
            <ul className="justify">
              <li>
                <a href="/home">
                  <i className="material-icons">home</i>
                </a>
              </li>
              <li>
                <a className="active" href="#">
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <a href="/basket">
                  <i className="material-icons">shopping_cart</i>
                </a>
              </li>
              <li>
                <a href="/history">
                  <i className="material-icons">history</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
