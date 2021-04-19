//script start
//nodemon server.js --exec babel-node -e js

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db_functions/functions");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Cookie } = require("express-session");
const fileUpload = require("express-fileupload");
const path = require("path");
require("dotenv").config({
  path: "/Users/ece/Downloads/convie/excludes/.env",
});
const app = express();
const Port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json({ limit: "200mb" }));
// app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use("/", express.static(path.join(__dirname, "/")));

app.use(cookieParser());
app.use(
  session({
    key: "customer",
    secret: process.env.session_secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

app.use(fileUpload({ createParentPath: true }));

app.post("/register", (req, res) => {
  db.registerCustomer(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "reg failed" });
    } else if (cb === 200) {
      res.status(200).send({ message: "reg success" });
    } else if (cb === 401) {
      res.status(401).send({ message: "reg heyhey" });
    } else if (cb === 409) {
      res.status(409).send({ message: "user exists" });
    } else {
      console.log("something wrong");
    }
  });
});

app.post("/login", (req, res) => {
  db.loginCustomer(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "login failed" });
    } else if (cb === 404) {
      res.status(404).send({ message: "user does not exist" });
    } else {
      req.session.user = cb[0];
      res.status(200).send({ message: "login success" });
    }
  });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200);
});

app.post("/customerAddress", (req, res) => {
  console.log(req.body);
  db.changeAddress(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "no update" });
    } else {
      req.session.user.customer_address = cb;
      res.status(200).send({ message: cb });
    }
  });
});

app.post("/picture", async (req, res) => {
  // console.log(req);
  try {
    if (!req.files) {
      res.send({ message: "no files" });
    } else {
      const { picture } = req.files;
      picture.mv("./uploads/" + picture.name);
      res.send({ picture });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/uploads", (req, res) => {
  console.log(req);
  console.log("uploads req");
  db.changeImage(req, (cb) => {
    if (cb === 404) {
      res.status(404).send({ message: "image failed" });
    } else if (cb === 200) {
      res.status(200).send({ message: "image changed" });
    }
  });
});

app.post("/account", (req, res) => {
  db.deleteAccount(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "deletion failed" });
    } else if (cb === 200) {
      res.status(200).send({ message: "deletion succesful" });
    }
  });
});

app.get("/products", (req, res) => {
  db.showProducts((cb) => {
    if (cb === 405) {
      res.status(405).send({ message: "failed" });
    } else {
      // console.log(cb);
      res.status(200).send({ prod: cb });
    }
  });
});

app.post("/order", (req, res) => {
  console.log(req);
  console.log("order req");
  db.sendOrder(req, (cb) => {
    if (cb === 400) {
      // res.status(400).send({ message: "failed" });
      console.log("hey");
    } else if (cb === 200) {
      res.status(200).send({ message: "succ" });
    }
  });
});

app.post("/history", (req, res) => {
  db.orderHistory(req, (cb) => {
    if (cb === 405) {
      res.status(405).send({ message: "failed" });
    } else {
      // console.log(cb);
      res.status(200).send({ history: cb });
    }
  });
});

app.get("/sessionInfo", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ user: req.session.user });
  } else {
    res.status(400).send({ message: "not logged in" });
  }
});

app.listen(Port, () => {
  console.log(`it's listening on port ${Port}`);
});

// error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(`the error is:  ${err.stack}`);
// });
