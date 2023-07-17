//  MongoDB connect

console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const router_bssr = require("./router_bssr.js");
const router = require("./router.js");
const cookieParser = require("cookie-parser");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// 1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 2: Session code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, //for 30 minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});

// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.use("/resto", router_bssr);
app.use("/", router);

module.exports = app;
