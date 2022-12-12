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
// app.use("/holidays", holidaysController);

// app.set("trust proxy", 1); // trust first proxy
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: true },
//   })
// );

app.get("/", (req, res) => {
  res.json({ msg: "Connection Success!" });
});

mongoose.connection.once("open", () => {
  console.log(`connected to mongo: ${mongoURI}`);
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
});
