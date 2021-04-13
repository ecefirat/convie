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

const registerCustomer = (req, res, cb) => {
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
    } else if ((res.length = 0)) {
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
    "SELECT customer_id, customer_name, customer_surname, customer_email, customer_address FROM customers WHERE customer_email = ?";

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
        } else if (response) {
          db.query(loginCustomer, [email], (error, res) => {
            if (error) {
              cb(400);
            } else if (res) {
              cb(res);
            }
          });
        }
      });
    }
  });
};

const changeAddress = (req, res, cb) => {
  const customer_address = req.body.customer_address;
  // const customer_name = req.body.customer_name;

  const ChangeAddress =
    "UPDATE customers SET customer_address = ? WHERE customer_name = 'ecce'";
  db.query(ChangeAddress, [customer_address], (err, res) => {
    if (err) {
      cb(400);
      console.log(err);
      console.log("update failed");
    }
    if (res) {
      console.log("update good");
    }
  });
};

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
  console.log(amount);

  const SendOrder = "INSERT INTO orders(order_amount) VALUES (?);";
  const SendOrderDetails = "INSERT INTO order_details(order_id) VALUES (?);";

  db.query(SendOrder, [amount], (err, res) => {
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

module.exports = {
  registerCustomer: registerCustomer,
  loginCustomer: loginCustomer,
  showProducts: showProducts,
  sendOrder: sendOrder,
  changeAddress: changeAddress,
};
