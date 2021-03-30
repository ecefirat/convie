import React from "react";

function Products(props) {
  const { product, addtoCart, removefromCart } = props;
  return (
    <div className="col s4" key={product.pID}>
      <div className="card">
        <div className="card-image">
          <img src={product.pImage} alt={product.pName} />
          <button
            className="btn-floating halfway-fab waves-effect waves-light red"
            onClick={() => addtoCart(product)}>
            <i className="material-icons">add</i>
          </button>
          {/* <button
            className="btn-floating btn-small waves-effect waves-light green"
            onClick={() => removefromCart(product)}>
            <i className="material-icons">remove</i>
          </button> */}
          <div className="card-content">
            <p>{product.pName}</p>
            <p>${product.pPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
