import React, { useState, useEffect } from "react";
import Products from "../Products/Products";

// const products = [
//   {
//     id: 1,
//     name: "Almond Milk",
//     price: 2.99,
//     imgUrl: "./images/almondmilk.jpg",
//   },
//   { id: 2, name: "Oat Milk", price: 3.99, imgUrl: "./images/oatmilk.jpg" },
//   {
//     id: 3,
//     name: "Maca Milk",
//     price: 4.99,
//     imgUrl: "./images/macamilk.jpg",
//   },
//   {
//     id: 4,
//     name: "Berries",
//     price: 5.99,
//     imgUrl: "./images/frozenberries.jpg",
//   },
//   { id: 5, name: "Bananas", price: 6.99, imgUrl: "./images/bananas.jpg" },
//   { id: 6, name: "Ben&Jerry", price: 7.99, imgUrl: "./images/benjerry.jpg" },
// ];

function Main() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState("");

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
            });
          } else if (res.status === 200) {
            res.json().then((data) => {
              setProducts(data.prod);
              setLoaded(true);
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
              style={{ float: "right" }}>
              ORDER
            </button>
          </div>
          {cart.map((cartItem, index) => {
            return (
              <>
                <li key={index}>
                  {cartItem.pName} - {cartItem.pPrice}
                </li>
              </>
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
