import React from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";

function Login(props) {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const submitCustomerLogin = (data) => {
    console.log(data);
    console.log("login data");
    let url = "http://localhost:5000/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res)
      .then((res) => {
        if (res.status === 404) {
          document.getElementById("notExists").style.display = "block";
        }
        if (res.status === 401) {
          document.getElementById("loginError").style.display = "block";
        }
        if (res.status === 200) {
          history.push("/");
          history.go();
        }
        console.log(res.status);
        res.json().then((data) => {
          console.log(data);
          console.log("above");
        });
      });
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit(submitCustomerLogin)}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">alternate_email</i>
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              ref={register({
                required: true,
              })}
            />
            {/* {errors.email && ("dkjfs")} */}
            <label htmlFor=" icon_prefix email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="password"
              type="password"
              className="validate"
              name="password"
              ref={register({
                required: true,
              })}
            />
            <span id="loginError">
              Your password and/or email is not correct. Your password should
              contain at least one number, one upper case and one lower case
              letter and must be 8 characters long.
            </span>
            <span id="notExists">
              The username does not exist in the system. Would you like to
              register?
            </span>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light green" type="submit">
          Login
          <i className="material-icons right">send</i>
        </button>
        <div style={{ columnCount: 2, columnGap: 10 }}>
          Don't have an account?
          <Link to="/register">
            {props.register}
            Register here!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
