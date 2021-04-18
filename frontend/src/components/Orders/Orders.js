import React, { useState, useEffect } from "react";

export const Orders = (props) => {
  const { total } = props;

  const [customer, setCustomer] = useState("");

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
          console.log(data);
          setCustomer(data.user.customer_name);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  return (
    <div className="container">
      <h2>Thank you {customer}!</h2>
      <h3>Your order has been placed.{total}</h3>
      <p>
        See <a href="http://localhost:3000/history">Order History</a>
      </p>
    </div>
  );
};
