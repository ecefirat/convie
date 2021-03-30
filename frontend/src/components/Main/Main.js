import React, { useState, useEffect } from "react";
import Products from "../Products/Products";

function Main() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState("");

  const handleSendOrder = (totall) => {
    fetch("http://localhost:5000/order", {
      method: "POST",
      body: JSON.stringify({ totals: totall }),
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
        .catch((error) => console.log(error))
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
        });
      return request;
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const addtoCart = (product) => {
    setCart((oldCart) => {
      return [...oldCart, product];
    });
  };

  const calculateTotal = () => {
    if (cart.length < 1) {
      return null;
    } else {
      let prices = cart.map((item, index) => {
        return item.pPrice;
      });
      let totals = prices.reduce((acc, cur) => acc + cur);
      setTotal(totals.toFixed(2));
      console.log(totals.toFixed(2));
      return total;
    }
  };

  return (
    <div className="row">
      <p>WELCOME {customer}</p>
      {loaded ? (
        <div>
          {products.map((product) => {
            return (
              <Products
                key={product.pID}
                id={product.pID}
                name={product.pName}
                price={product.pPrice}
                imgUrl={product.pImage}
                addtoCart={() => addtoCart(product)}
              />
            );
          })}
          Cart ({cart.length})
          <div style={{ float: "right" }}>
            <h3>{total}</h3>
            <button
              className="btn waves-effect waves-light green"
              style={{ float: "right" }}
              onClick={() => handleSendOrder(total)}>
              ORDER
            </button>
          </div>
          {cart.map((cartItem) => {
            return (
              <li key={cartItem.pID}>
                {cartItem.pName} - {cartItem.pPrice}
              </li>
            );
          })}
        </div>
      ) : (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
    </div>
  );
}

export default Main;
