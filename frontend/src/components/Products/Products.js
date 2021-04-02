// import React, { useEffect, useState } from "react";
// import Product from "./Product/Product";

// function Products(props) {
//   const { products, addtoCart, removefromCart } = props;
//   //   const [products, setProducts] = useState([]);
//   //   const [loaded, setLoaded] = useState(false);

//   //   useEffect(() => {
//   //     async function fetchAPI() {
//   //       const request = await fetch("http://localhost:5000/products", {
//   //         method: "GET",
//   //         body: JSON.stringify(),
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         credentials: "include",
//   //       })
//   //         .catch((error) => console.log(error))
//   //         .then((res) => {
//   //           if (res.status === 405) {
//   //             res.json().then((data) => {
//   //               console.log(data);
//   //               console.log("this is products data /error 405");
//   //             });
//   //           } else if (res.status === 200) {
//   //             res.json().then((data) => {
//   //               setProducts(data.prod);
//   //               setLoaded(true);
//   //               console.log(data);
//   //               console.log("this is products data");
//   //             });
//   //           }
//   //         });
//   //       return request;
//   //     }
//   //     fetchAPI();
//   //   }, []);

//   <div>
//     {products.map((product) => {
//       return (
//         <Product
//           key={product.pID}
//           product={product}
//           addtoCart={addtoCart(product)}
//           removefromCart={removefromCart(product)}
//         />
//       );
//     })}
//   </div>;
// }

// export default Products;
