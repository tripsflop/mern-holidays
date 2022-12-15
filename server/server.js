const result = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const db = mongoose.connection;
const holidaysController = require("../server/controllers/holidays.js");

// Config
const mongoURI = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose.set("runValidators", true); //so validators will run during update
mongoose.set("debug", true);
mongoose.connect(mongoURI);

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", mongoURI));
db.on("disconnected", () => console.log("mongo disconnected"));

// middleware
app.use(express.json()); //use .json(), not .urlencoded()
// app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("../client/dist"));
app.use(cookieParser());
app.use("/api/holidays", holidaysController);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

//  custom middleware that runs for all your routes
const myMiddleware = (req, res, next) => {
  console.log("I am running");
  next();
};

app.use(myMiddleware);

// Fake login
app.post("/api/session", (req, res) => {
  /** 3 responses
   * blank userid & password -> 400 -> skip
   * user id not found  -> 401
   * wrong password -> 401
   * database error - skip -> 500
   * login success -> 200
   * */

  if (req.body.password === "123") {
    req.session.login = true;
    res.json({ msg: "ok" });
  } else {
    res.status(401).json({ error: "Not ok" });
  }

  res.json();
});

// real implementation
// app.get("/api/secret", (req, res) => {
//   if (req.session.login == true) {
//     res.json({ msg: "Need more milo" });
//   } else {
//     res.status(401).json({ error: "Not ok" });
//   }
// });

const checkLogin = (req, res, next) => {
  if (req.session.login !== true) {
    //? matches login -> check
    res.status(401).json({ msg: "Cannot see" });
  } else {
    next();
  }
};

app.delete("/api/sessions", (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout success" });
  });
});

// use the middleware to check if user is logged in!
app.get("/api/secret", [checkLogin], (req, res) => {
  res.json({ msg: "Need more milo" });
});

app.get("/api/secret2", (req, res) => {
  res.json({ msg: "Need more snacks" });
});

app.get("/", (req, res) => {
  res.json({ msg: "Connection Success!" });
});

mongoose.connection.once("open", () => {
  console.log(`connected to mongo: ${mongoURI}`);
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
