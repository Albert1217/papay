//  MongoDB connect

console.log("Web Serverni boshlash");
const express = require("express");
const app = express();

const router_bssr = require("./router_bssr.js");

let session = require("express-session");
const router = require("./ router.js");

const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session code

// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code

app.use("/", router);
app.use("/resto", router_bssr);

module.exports = app;
