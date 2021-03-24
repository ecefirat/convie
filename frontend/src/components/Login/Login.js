import React from "react";
// import axios from 'axios';
// import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login(props) {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

  const submitCustomerLogin = (data) => {
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
          history.push("/login");
        }
        if (res.status === 200) {
          history.push("/");
        }
        console.log(res.status);
        res.json().then((data) => {
          console.log(data);
        });
      });
  };

  return (
    <div className="row">
      <form className="col s12" onSubmit={handleSubmit(submitCustomerLogin)}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">alternate_email</i>
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              ref={register({ required: true })}
            />
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
              ref={register({ required: true })}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light green" type="submit">
          Login
          <i className="material-icons right">send</i>
        </button>
      </form>

      <div>
        <span>Dont have an account? Register here!</span>
      </div>
    </div>
  );
}

export default Login;
