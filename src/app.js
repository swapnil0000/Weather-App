require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const http = require("http");
const fs = require("fs");
const requests = require("requests");
const nodemailer = require("nodemailer");
// const { resolveSoa } = require("dns");

const templatePath = path.join(__dirname, "../templates/views");
app.set("view engine", "hbs");
app.set("views", templatePath);

const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));
let data = [];

app.get("/", (req, res) => {
  // res.send("Home Page");
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/planner", (req, res) => {
  res.render("planner");
});

app.get("/mail", (req, res) => {
  // console.log("sending mail");
  // res.send("sending mail");
  console.log(req.query);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `KnowYourWeatherAndPlan@gmail.com`,
      pass: `${process.env.PASS}`,
    },
  });

  var mailOptions = {
    from: `KnowYourWeatherAndPlan@gmail.com`,
    to: `${req.query.msg[0]}`,
    subject: "Sending Email using Node.js",
    text: `${req.query.msg[1]}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.render("sent");
    }
  });
});
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
