import React from "react";

function Products(props) {
  // const [product, setProduct] = useState([]);

  return (
    <div className="col s4" key={props.id}>
      <div className="card">
        <div className="card-image">
          <img src={props.imgUrl} alt={props.name} />
          <a
            className="btn-floating halfway-fab waves-effect waves-light red"
            onClick={props.addtoCart}>
            <i className="material-icons">add</i>
          </a>
          <div className="card-content">
            <p>{props.name}</p>
            <p>{props.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// {
// <div className="col s4">
//   <div className="card">
//     <div className="card-image">
//       <img src="./images/almondmilk.jpeg" />
//       <a className="btn-floating halfway-fab waves-effect waves-light red">
//         <i className="material-icons">add</i>
//       </a>
//     </div>
//     <div className="card-content"></div>
//     <div className="card-action">
//       <a href="#">link</a>
//     </div>
//   </div>
// </div>
// }

export default Products;
