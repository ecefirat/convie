import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Profile from "../components/Profile/Profile";
import Login from "../components/Login/Login";
import Basket from "../components/Basket/Basket";
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import React from "react";
import Register from "../components/Register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../index.css";

function App(props) {
  return (
    <Router>
      <div>
        <Header
          profile="Profile"
          register="Register"
          login="Login"
          basket="Cart"
        />
        <div className="container">
          <Switch>
            {/* <Route path="/" exact={true}>
              <Register />
            </Route> */}
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/basket">
              <Basket />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
