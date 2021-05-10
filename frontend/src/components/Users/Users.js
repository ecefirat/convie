import React from "react";

function Users(props) {
  const { user } = props;
  return (
    <div className="col s4 m2 l2" key={user.customer_id}>
      <div className="card">
        <div className="card-image" style={{ width: 100 }}>
          <img src={user.profile_picture} alt={user.customer_name} />
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
