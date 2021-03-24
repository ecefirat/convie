import React, { useState } from "react";

function Basket(props) {
  const [cart, setCart] = useState([]);
  const addtoCart = (product) => {
    setCart([...cart, product]);
  };
  return (
    <div>
      <h1>Cart ({cart.length})</h1>
      {cart.map((cartItem) => (
        <div key={cartItem.id}>
          {cartItem.name} - {cartItem.price}
        </div>
      ))}
    </div>
  );
}
export default Basket;
