const express = require("express");
const router = express.Router();
const memberController = require("./controllers/memberController");

//memberga dahldor routerlar
router.get("/", memberController.home);
router.post("/signup", memberController.signup);
router.post("/login", memberController.login);
router.get("/logout", memberController.logout);

//boshqa routerlar
router.get("/menu", (req, res) => {
  res.send("Menu  sahifadasiz");
});

router.get("/community", (req, res) => {
  res.send("jamiyat sahifadasiz");
});

module.exports = router;

//9:53
