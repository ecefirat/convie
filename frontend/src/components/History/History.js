import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import HistoryDetails from "../HistoryDetails/HistoryDetails";

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
      {loggedIn && history ? (
        <div>
          <h2 className="header">Order History</h2>
          <p>Customer Name: {customer_name}</p>
          <p> Customer Number: {customer_id}</p>

          {history.map((row) => {
            return <HistoryDetails key={row.order_id} row={row} />;
          })}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default History;
