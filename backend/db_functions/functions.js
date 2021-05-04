require("dotenv").config({
  path: "/Users/ece/Downloads/convie/excludes/.env",
});
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mysql = require("mysql");

const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
});

const registerCustomer = (req, cb) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  const RegisterCustomer =
    "INSERT INTO customers(customer_name, customer_surname, customer_email, customer_password) VALUES (?, ?, ?, ?);";

  const checkifExists =
    "SELECT customer_email FROM customers WHERE customer_email = ?";

  db.query(checkifExists, [email], (err, res) => {
    if (err) {
      console.log(err);
    } else if (res.length > 0) {
      cb(409);
    } else {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
          cb(401);
        }
        db.query(
          RegisterCustomer,
          [first_name, last_name, email, hash],
          (err, result) => {
            if (err) {
              cb(400);
            } else {
              console.log(result);
              cb(200);
            }
          }
        );
      });
    }
  });
};

const loginCustomer = (req, cb) => {
  const email = req.body.email;
  const password = req.body.password;

  const checkCustomer = "SELECT * FROM customers WHERE customer_email = ?";
  const loginCustomer =
    "SELECT customer_id, customer_name, customer_surname, customer_email, customer_address, profile_picture FROM customers WHERE customer_email = ?";

  db.query(checkCustomer, [email], (err, result) => {
    // console.log(result);
    if (err) {
      cb(400);
      console.log(err);
    }
    if (result.length === 0) {
      cb(404);
    }
    if (result.length > 0) {
      console.log(result[0]);
      // console.log(result[0].customer_password);
      console.log("result from the db for login");
      bcrypt.compare(password, result[0].customer_password, (err, response) => {
        if (err) {
          console.log(err);
        } else if (!response) {
          cb(401);
          console.log("passwords dont match");
        } else if (response) {
          db.query(loginCustomer, [email], (error, res) => {
            if (error) {
              console.log(error);
            } else if (res) {
              cb(res);
            }
          });
        }
      });
    }
  });
};

const changeAddress = (req, cb) => {
  const customer_address = req.body.customer_address;
  const customer_email = req.body.customer_email;

  const ChangeAddress =
    "UPDATE customers SET customer_address = ? WHERE customer_email = ?";
  db.query(ChangeAddress, [customer_address, customer_email], (err, res) => {
    if (err) {
      cb(400);
      console.log(err);
      console.log("update failed");
    }
    if (res) {
      cb(customer_address);
      console.log("update good");
    }
  });
};

const changeImage = (req, res, cb) => {
  console.log(req.body.profile_picture);
  const customer_email = req.body.customer_email;
  const profile_picture = req.body.profile_picture;

  const ChangeImage =
    "UPDATE customers SET profile_picture = ? WHERE customer_email = ?";
  db.query(ChangeImage, [profile_picture, customer_email], (err, res) => {
    if (err) {
      // cb(400);
      console.log(err);
      console.log("image update failed");
    }
    if (res) {
      console.log("image update good");
    }
  });
};

const deleteAccount = (req, res, cb) => {
  const customer_email = req.body.customer_email;

  const DeleteAccount = "DELETE FROM customers WHERE customer_email = ?;";

  db.query(DeleteAccount, [customer_email], (err, res) => {
    if (err) {
      console.log(err);
      console.log("account can't be deleted");
    } else if (res) {
      console.log("account deleted");
    }
  });
};
// const uploadImage = (req, res, cb) => {
//   console.log(req.file);
//   console.log("db upload");
//   const profile_picture = req.body.picture.name;
//   console.log(profile_picture);

//   const UploadImage =
//     "UPDATE customers SET profile_picture = ? WHERE customer_name = 'sugar'";

//   db.query(UploadImage, [profile_picture], (error, result) => {
//     if (error) {
//       cb(400);
//       console.log(error);
//       console.log("image upload failed");
//     } else if (result) {
//       console.log("image upload fine");
//     }
//   });
// };

const showProducts = (cb) => {
  const ShowProducts = "SELECT * FROM products";

  db.query(ShowProducts, (err, results) => {
    if (err) {
      console.log(err);
      cb(405);
    } else if (results.length > 0) {
      // console.log(results);
      cb(results);
    } else if ((results.length = 0)) {
      cb(404);
    }
  });
};

const sendOrder = (req, cb) => {
  const amount = req.body.totals;
  const customer_id = req.body.customer_id;
  const customer_address = req.body.customer_address;
  console.log(amount);

  const SendOrder =
    "INSERT INTO orders(order_amount, customer_id, order_address) VALUES (?, ?, ?);";
  const SendOrderDetails = "INSERT INTO order_details(order_id) VALUES (?);";

  db.query(SendOrder, [amount, customer_id, customer_address], (err, res) => {
    if (err) {
      console.log("err sendorder");
      console.log(err);
      cb(400);
    }
    if (res) {
      cb(200);
      console.log("success");
      db.query(SendOrderDetails, [res.insertId], (err, res) => {
        if (err) {
          console.log("order details error");
          console.log(err);
        } else {
          console.log("success foreign key");
        }
      });
    } else {
      console.log("error after res");
    }
  });
};

const orderHistory = (req, cb) => {
  const customer_id = req.body.customer_id;
  console.log(customer_id);
  const OrderHistory =
    "SELECT * FROM orders WHERE customer_id = ? ORDER BY order_id DESC";

  db.query(OrderHistory, [customer_id], (err, results) => {
    if (err) {
      console.log(err);
      // cb(405);
    } else if (results.length > 0) {
      console.log(results);
      console.log("above");
      cb(results);
    } else if ((results.length = 0)) {
      // cb(404);
      console.log("hey");
    }
  });
};

const deleteOrder = (req, cb) => {
  const order_id = req.body.order_id;

  const DeleteOrder = "DELETE FROM orders WHERE order_id= ?";

  db.query(DeleteOrder, [order_id], (err, res) => {
    if (err) {
      cb(400);
      console.log(err);
    } else {
      cb(order_id);
      console.log("order deleted");
    }
  });
};

module.exports = {
  registerCustomer: registerCustomer,
  loginCustomer: loginCustomer,
  showProducts: showProducts,
  sendOrder: sendOrder,
  changeAddress: changeAddress,
  changeImage: changeImage,
  deleteAccount: deleteAccount,
  orderHistory: orderHistory,
  deleteOrder: deleteOrder,
};
