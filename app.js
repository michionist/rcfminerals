const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dbConfig = require("./config/database");
const indexRoute = require("./routes/indexRoute");
const aboutRoute = require("./routes/aboutRoute");
const servicesRoute = require("./routes/servicesRoute");
const helpers = require("./helpers");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
const mail = require("../handlers/mail");

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

// Mail Form Route
app.post("/send", (req, res) => {
  const output = `
        <p>You have a new contact request from RCF</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${req.body.contact_name}</li>
          <li>Company: ${req.body.contact_company}</li>
          <li>Email: ${req.body.contact_email}</li>
          <li>Phone: ${req.body.contact_phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.contact_message}</p>
      `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"RCF Minerals Website" ' + process.env.MAIL_USER, // sender address
    to: process.env.RECEIVER_EMAIL_ADDR, // list of receivers
    subject: "One New Inquiry from RcfMineralsLtd.com", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render("contact", {
      msg: "Email has been sent"
    });
  });
  // console.log(req.body);
});

// A non-specific ROUTE
app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running..... @ http://127.0.0.1/${port}`);
});
