import React from "react";

function Basket(props) {
  const { cart, addtoCart, removefromCart } = props;

  return (
    <div>
      {/* <p>Cart</p> */}
      <div>{cart && !cart.length && <div>Cart is empty.</div>}</div>
      {cart.map((item) => {
        return (
          <div key={item.pID}>
            <div style={{ display: "inline" }}>
              {item.pName} -
              <div style={{ display: "inline" }}>
                - {item.qty} x {item.pPrice} --
              </div>
              {/* <button onClick={() => addtoCart(item)}>
                <i className="tiny material-icons">add</i>
              </button> */}
              <i
                className="small material-icons"
                onClick={() => addtoCart(item)}>
                add_circle_outline
              </i>
              <i
                className="small material-icons"
                onClick={() => removefromCart(item)}>
                remove_circle_outline
              </i>
              {/* <button onClick={() => removefromCart(item)}>-</button> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Basket;
