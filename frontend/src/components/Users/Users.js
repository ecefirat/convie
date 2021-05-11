import React from "react";

function Users(props) {
  const { user } = props;
  return (
    <div className="col s12" key={user.customer_id}>
      <div className="card horizontal">
        <div className="card-stacked" style={{ flexDirection: "row" }}>
          <img
            src={user.profile_picture}
            alt={user.customer_name}
            style={{ width: 100, height: 100, margin: 10 }}
          />
          <button
            style={{ display: "inline-block" }}
            className="btn-floating btn-small halfway-fab waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
          <div className="card-content">
            <p>{user.customer_name}</p>
            <p>{user.customer_surname}</p>
            <p>{user.customer_address}</p>
            <p>{user.customer_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
