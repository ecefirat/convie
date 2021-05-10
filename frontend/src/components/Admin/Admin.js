import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Users from "../Users/Users";

const Admin = () => {
  let history = useHistory();
  const [loaded, setLoaded] = useState(false);

  //   const [customer, setCustomer] = useState("");
  //   const [customer_id, setCustomerId] = useState("");
  //   const [customer_name, setCustomerName] = useState("");
  //   const [customer_surname, setCustomerSurname] = useState("");
  //   const [customer_email, setCustomerEmail] = useState("");
  //   const [customer_address, setCustomerAddress] = useState("");
  //   const [role, setRole] = useState("");
  //   const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      const request = await fetch("http://localhost:5000/userInfo", {
        method: "GET",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => {
          if (res.status === 400) {
            res.json().then((data) => {
              console.log(data);
              console.log("users info error");
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setUsers(data.users);
              setLoaded(true);
              console.log(data);
              console.log("users info");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  return (
    <>
      {users.map((user) => {
        return <Users key={user.customer_id} user={user} />;
      })}
    </>
  );
};

export default Admin;
