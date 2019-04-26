const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const dbConfig = require("./config/database");
const passport = require("passport");
const passportConfig = require("./config/passport");
const router = express.Router();
const indexRoute = require("./routes/indexRoute");
const aboutRoute = require("./routes/aboutRoute");
const servicesRoute = require("./routes/servicesRoute");
const helpers = require('./helpers');




// Init app
const app = express();


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



// TODO: Express session config
// TODO: Express Message Middleware

// HANDLE ROUTING
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/services', servicesRoute);


// A non-specific ROUTE
app.get("*", (req, res) => {
    res.render("404");
});

const port = 3300;
app.listen(port, () => {
    console.log(`Server running..... @ http://127.0.0.1/${port}`);
});