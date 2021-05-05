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
          history.push("/login");
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

  const deleteOrder = (data) => {
    console.log(data);
    console.log("deleteorder");
    fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("can't delete");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data.order_id);
          console.log("order details are deleted");
          document.getElementById(
            "deleteOrder"
          ).innerHTML = `Order ${data.order_id} is deleted.`;
        });
      }
    });
  };

  return (
    <div style={{ marginBottom: 70 }}>
      {history.length > 0 ? (
        <div>
          <h2 className="header">Order History</h2>
          <p>Customer Name: {customer_name}</p>
          <p>Customer Number: {customer_id}</p>
          <p id="deleteOrder" style={{ color: "red" }}></p>
          {history.map((order) => {
            return (
              <HistoryDetails
                key={order.order_id}
                order={order}
                deleteOrder={deleteOrder}
              />
            );
          })}
        </div>
      ) : (
        <>
          {/* <div className="progress">
            <div className="indeterminate"></div>
          </div> */}
          <p>Please login to continue...</p>
        </>
      )}
    </div>
  );
}

export default History;
