const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("home sahifadasiz");
});

router.get("/menu", (req, res) => {
  res.send("menu sahifadasiz");
});

router.get("/community", (req, res) => {
  res.send("jamiyat sahifadasiz");
});

module.exports = router;
