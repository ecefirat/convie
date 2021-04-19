import React, { useEffect, useState } from "react";
import Login from "../Login/Login";

function History() {
  const [customer_name, setCustomerName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [history, setHistory] = useState([]);
  const [customer_id, setCustomerId] = useState("");

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
          setCustomerName(data.user.customer_name);
          setCustomerId(data.user.customer_id);
          setLoggedIn(true);
        });
      } else if (res.status === 400) {
        res.json().then((data) => {
          console.log(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(customer_id);
    console.log("customer_id");
    async function fetchAPI() {
      const request = await fetch("http://localhost:5000/history", {
        method: "POST",
        body: JSON.stringify({ customer_id: customer_id }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 405) {
            res.json().then((data) => {
              console.log(data);
              console.log("this is products data /error 405");
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setHistory(data.history);
              console.log(data);
              console.log("history data");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, [customer_id]);

  useEffect(() => {});

  return (
    <div>
      {loggedIn ? (
        <div>
          order history {customer_name}
          {customer_id}
          {history.map((row) => {
            return (
              <>
                <p>{row.order_amount}</p>
                <p>{row.order_date}</p>
              </>
            );
          })}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default History;
