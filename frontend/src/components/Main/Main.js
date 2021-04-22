import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Product from "../Products/Product/Product";
import Basket from "../Basket/Basket";
import Orders from "../Orders/Orders";
import "./Main.css";
import Login from "../Login/Login";

function Main(props) {
  let history = useHistory();
  // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //change this to if(!data) {return Loading}

  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSendOrder = (totall) => {
    fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({ totals: totall, customer_id: customer_id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        console.log(res);
        console.log("first");
        if (res.status === 400) {
          res.json().then((data) => {
            console.log(data);
          });
        } else if (res.status === 200) {
          res.json().then((data) => {
            console.log(data);
            history.push("/orders");
          });
        }
      })
      .catch((error) => console.log(error));
  };

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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotal();
  }, [cart]);

  const addtoCart = (product) => {
    const exists = cart.find((i) => i.pID === product.pID);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.pID === product.pID ? { ...exists, qty: exists.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removefromCart = (product) => {
    const exists = cart.find((i) => i.pID === product.pID);
    if (exists.qty === 1) {
      setCart(cart.filter((i) => i.pID !== product.pID));
    } else {
      setCart(
        cart.map((i) =>
          i.pID === product.pID ? { ...exists, qty: exists.qty - 1 } : i
        )
      );
    }
  };

  const calculateTotal = () => {
    if (cart.length < 1) {
      return null;
    } else {
      let prices = cart.map((item, index) => {
        return item.pPrice * item.qty;
      });
      let totals = prices.reduce((acc, cur) => acc + cur);
      setTotal(totals.toFixed(2));
      console.log(totals.toFixed(2));
      return total;
    }
  };

  return (
    <div>
      {loggedIn ? (
        <div className="row">
          <p>WELCOME {customer}</p>
          {loaded ? (
            <div>
              {products.map((product) => {
                return (
                  <Product
                    key={product.pID}
                    product={product}
                    addtoCart={addtoCart}
                    removefromCart={removefromCart}
                  />
                );
              })}
              <button
                className="order-btn btn waves-effect waves-light green"
                onClick={() => handleSendOrder(total)}>
                ${total} - ORDER
              </button>
              <Basket
                cart={cart}
                addtoCart={addtoCart}
                removefromCart={removefromCart}
              />
            </div>
          ) : (
            <div className="progress">
              <div className="indeterminate"></div>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Main;
