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
const { body, validationResult } = require("express-validator");

const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: "./log/logger.log",
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

logger.info("hello");

// const logger = (req, res, next) => {
//   console.log(moment().format());
//   next();
// };

// app.use(logger);

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

const rateLimit = require("express-rate-limit");

// const dayLimiter = rateLimit({
//   windowMs: 24 * 60 * 60 * 1000, // 24 hours
//   max: 1000, // 1000 requests
// });

// const secondLimiter = rateLimit({
//   windowMs: 1000, // 1 second
//   max: 10, // 1 request
// });

// app.use(dayLimiter);
// app.use(secondLimiter);

app.post(
  "/register",
  body("first_name").isAlpha(),
  body("last_name").isAlpha(),
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 8 }),
  body("password").isAlphanumeric(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
  }
);

app.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    db.loginCustomer(req, (cb) => {
      if (cb === 400) {
        res.status(400).send({ message: "login failed" });
      } else if (cb === 404) {
        res.status(404).send({ message: "user does not exist" });
      } else if (cb === 401) {
        res.status(401).send({ messsage: "password incorrect" });
      } else {
        req.session.user = cb[0];
        res.status(200).send({ user: cb[0] });
        logger.info("hey1");
        logger.info(req.session.user.customer_email);
        logger.info("hey2");
      }
    });
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

app.post(
  "/customerAddress",
  // body("customer_address").isAlphanumeric(),
  body("customer_address").isLength({ max: 50 }),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    db.changeAddress(req, (cb) => {
      if (cb === 400) {
        res.status(400).send({ message: "no update" });
      } else {
        req.session.user.customer_address = cb;
        res.status(200).send({ message: cb });
      }
    });
  }
);

app.post("/picture", async (req, res) => {
  // implement validation
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
  // implement validation
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
      res.status(200).send({ prod: cb });
    }
  });
});

app.get("/userInfo", (req, res) => {
  db.getUserInfo((cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "can't get user info" });
    } else {
      res.status(200).send({ users: cb });
    }
  });
});

app.post("/order", (req, res) => {
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
  // let user_id = req.session.user.customer_id
  db.orderHistory(req, (cb) => {
    if (cb === 405) {
      res.status(405).send({ message: "failed" });
    } else {
      res.status(200).send({ history: cb });
    }
  });
});

app.post("/orders", (req, res) => {
  db.deleteOrder(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "order cannot be deleted" });
    } else {
      res.status(200).send({ order_id: cb });
    }
  });
});

app.post(
  "/pName",
  // body("customer_address").isAlphanumeric(),
  // body("customer_address").isLength({ max: 50 }),

  (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    db.changePName(req, (cb) => {
      if (cb === 400) {
        res.status(400).send({ message: "no change in pname" });
      } else {
        console.log(cb);
        console.log("pname updates");
        // req.session.user.customer_address = cb;
        res.status(200).send({ message: cb });
      }
    });
  }
);

app.post("/uName", (req, res) => {
  db.changeUName(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "no change in uname" });
    } else {
      console.log(cb);
      console.log("uname updates");
      res.status(200).send({ message: cb });
    }
  });
});

app.post("/users", (req, res) => {
  db.deleteUser(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "user cannot be deleted" });
    } else {
      res.status(200).send({ user_id: cb });
    }
  });
});

app.post("/product", (req, res) => {
  db.deleteProduct(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "product cannot be deleted" });
    } else {
      res.status(200).send({ pID: cb });
    }
  });
});

app.post("/addProduct", (req, res) => {
  db.addProduct(req, (cb) => {
    if (cb === 400) {
      res.status(400).send({ message: "product cannot be added" });
    } else {
      res.status(200).send({ pName: cb });
    }
  });
});

app.get("/sessionInfo", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ user: req.session.user });
    logger.info("sessions");
    logger.info(req.session.user);
    logger.info(req.sessionID);
    logger.warn(req.headers);
    logger.warn(req.ip);
    logger.info("heyyyyyyyyyyy");
    logger.info(req);
  } else {
    res.status(400).send({ message: "not logged in" });
  }
});

module.exports = app;
