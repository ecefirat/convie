require("dotenv").config({
  path: "/Users/ecefirat/Documents/projects/convie/.env",
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

  console.log(email);
  const checkCustomer = "SELECT * FROM customers WHERE customer_email = ?";

  db.query(checkCustomer, [email], (err, result) => {
    console.log(result);
    if (err) {
      cb(400);
      console.log(err);
    }
    if (result.length === 0) {
      cb(404);
    }
    if (result.length > 0) {
      console.log(result[0]);
      console.log(result[0].customer_password);
      console.log("pass");
      bcrypt.compare(password, result[0].customer_password, (err, response) => {
        if (err) {
          console.log(err);
        } else if (response) {
          cb(200);
        }
      });
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

module.exports = {
  registerCustomer: registerCustomer,
  loginCustomer: loginCustomer,
  showProducts: showProducts,
};
