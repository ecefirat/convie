import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Profile() {
  const { register, handleSubmit } = useForm();
  const [customer_address, setCustomerAddress] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sessionInfo", {
      method: "GET",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setCustomerAddress(data.user.customer_address);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  });

  const handleAddress = (customer_address) => {
    console.log(customer_address);
    fetch("http://localhost:5000/customers", {
      method: "POST",
      body: JSON.stringify(customer_address),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("couldnt change");
      }
      if (res.status === 200) {
        res.json().then((customer_address) => {
          console.log(customer_address);
          console.log("address above");
        });
      }
    });
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <ul>
        <li>Edit Address</li>
        <p>{customer_address}</p>
        <button onClick={handleSubmit(handleAddress)}>Change Address</button>
        <input type="text" name="customer_address" ref={register} />
        <li>Upload/Change Profile Picture</li>
        <li>Update Payment Details</li>
      </ul>
    </div>
  );
}

export default Profile;
