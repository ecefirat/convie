import React, { useState } from "react";

function AdminProducts(props) {
  const { product } = props;
  const [pName, setPName] = useState("");

  const changePName = (e) => {
    console.log(e);
    const val = e.target.value;
    fetch("http://localhost:5000/pName", {
      method: "POST",
      body: JSON.stringify(val),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((res) => {
      if (res.status === 404) {
        console.log("cant change pname");
      } else if (res.status === 200) {
        res.json().then((product) => {
          console.log(product);
          setPName(product.message);
          console.log("pname above");
        });
      }
    });
  };

  return (
    <div className="col s4 m2 l2" key={product.pID}>
      <div className="card horizontal">
        <div className="card-stacked" style={{ flexDirection: "row" }}>
          <img
            src={product.pImage}
            alt={product.pName}
            style={{ width: 100, height: 100, margin: 10 }}
          />
          <button className="btn-floating btn-small halfway-fab waves-effect waves-light red">
            <i className="material-icons">delete</i>
          </button>
          <div className="card-content">
            {/* <input></input> */}
            <input
              type="text"
              placeholder={pName}
              onKeyPress={(event) => {
                if (event.key === 13) {
                  changePName(pName);
                }
              }}
            />
            {/* <button onClick={(e) => changePName(e)}>submit</button> */}
            {/* <p>{product.pName}</p> */}
            <p>${product.pPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
