import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Register(props) {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  console.log("bla");

  const submitCustomerRegistration = (data) => {
    console.log(data);
    let url = "http://localhost:5000/register";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("blab");
      if (res.status === 404) {
        history.push("/login");
      }
      if (res.status === 200) {
        history.push("/");
      }
      console.log(res.status);
      res.json().then((data) => {
        console.log(data);
        console.log("this one");
      });
    });
  };

  return (
    <div className="row">
      <form
        className="col s12"
        onSubmit={handleSubmit(submitCustomerRegistration)}>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>

            <input
              id="first_name"
              name="first_name"
              type="text"
              className="validate"
              ref={register({ required: true })}
            />
            {errors.first_name && <span>This field is required</span>}
            <label htmlFor="icon_prefix first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circl</i>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className="validate"
              ref={register({ required: true })}
            />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">alternate_email</i>
            <input
              id="email"
              name="email"
              type="email"
              className="validate"
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
              name="password"
              type="password"
              className="validate"
              ref={register({ required: true })}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">loc</i>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="validate"
              ref={register({ required: true })}
            />
            <label htmlFor="password">Confirm Password</label>
          </div>
        </div>
        <button
          id="bg-color"
          className="btn waves-effect waves-light green"
          type="submit"
          name="action">
          Register
          <i className="material-icons right">send</i>
        </button>
      </form>
      <div className="mt-2">
        <span>Already have an account? Login here</span>
      </div>
    </div>
  );
}
export default Register;
