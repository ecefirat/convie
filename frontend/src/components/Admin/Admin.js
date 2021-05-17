import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminProducts from "../AdminProducts/AdminProducts";
import Product from "../Products/Product/Product";
import Users from "../Users/Users";

const Admin = (props) => {
  let history = useHistory();
  const [loaded, setLoaded] = useState(false);

  const { register, handleSubmit } = useForm();

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    async function fetchAPI() {
      const request = await fetch("http://localhost:5000/products", {
        method: "GET",
        body: JSON.stringify(),
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
              setProducts(data.prod);
              setLoaded(true);
              console.log(data);
              console.log("this is products data");
            });
          }
        })
        .catch((error) => console.log(error));
      return request;
    }
    fetchAPI();
  }, []);

  const addProduct = (data) => {
    console.log(data);
    fetch("http://localhost:5000/addProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("cant add product");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log("added");
        });
      }
    });
  };

  const addAdmin = (data) => {
    console.log(data);
    fetch("http://localhost:5000/addAdmin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 400) {
        console.log("cant add admin");
      } else if (res.status === 200) {
        res.json().then((data) => {
          console.log(data);
          console.log("added");
        });
      }
    });
  };

  return (
    <>
      <h2>Users</h2>
      <h5>Add New Admin</h5>
      <input
        type="text"
        name="customer_name"
        placeholder="Name"
        ref={register}
      />
      <input
        type="text"
        name="customer_surname"
        placeholder="Surname"
        ref={register}
      />
      <input
        type="email"
        name="customer_email"
        placeholder="Email"
        ref={register}
      />
      <input
        type="password"
        name="customer_password"
        placeholder="Password"
        ref={register}
      />
      <i
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={handleSubmit(addAdmin)}>
        add
      </i>
      <div style={{ height: 350, overflow: "scroll" }}>
        {users.map((user) => {
          return <Users key={user.customer_id} user={user} />;
        })}
      </div>
      <h2>Products</h2>
      <h5>Add New Product</h5>
      <input
        type="text"
        name="pName"
        placeholder="Product Name"
        ref={register}
      />
      <input
        type="number"
        name="pPrice"
        placeholder="Product Price"
        ref={register}
      />
      <i
        className="material-icons"
        style={{ cursor: "pointer" }}
        onClick={handleSubmit(addProduct)}>
        add
      </i>
      <div style={{ height: 300, overflow: "scroll", marginBottom: 80 }}>
        {products.map((product) => {
          return <AdminProducts key={product.pID} product={product} />;
        })}
      </div>
    </>
  );
};

export default Admin;
