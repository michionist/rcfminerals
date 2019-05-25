const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dbConfig = require("./config/database");
const indexRoute = require("./routes/indexRoute");
const aboutRoute = require("./routes/aboutRoute");
const servicesRoute = require("./routes/servicesRoute");
const susRoute = require("./routes/susRoute");
const helpers = require("./helpers");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const mail = require("./handlers/mail");

// Init app
const app = express();

// import environmental variables from our variables.env file
dotenv.config({
  path: "variables.env"
});

// DATABASE CONNECTION
mongoose.connect(dbConfig.database, {
  useNewUrlParser: true
});
let db = mongoose.connection;

// Check for Errors
db.on("error", err => console.log(err));

//Check Connection
db.once("open", () => console.log("Connected to Database"));

// Load view Engines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set the Public DIR
app.use(express.static(path.join(__dirname, "/public")));

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});

//Set the bodyParser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// TODO: Express session config
// TODO: Express Message Middleware

// HANDLE ROUTING
app.use("/", indexRoute);
app.use("/about", aboutRoute);
app.use("/services", servicesRoute);
app.use("/sustainability", susRoute);

// Mail Form Route
app.post("/send", mail);

// A non-specific ROUTE
app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running..... @ http://127.0.0.1/${port}`);
});