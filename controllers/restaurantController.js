const session = require("express-session");
const Member = require("../models /Member");

let restaurantController = module.exports;

restaurantController.getMyRestaurantData = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantData");
    // TODO: Get my restaurant products

    res.render("restaurant-menu");
  } catch (err) {
    console.log(`ERROR,cont/getMyRestaurantData, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getSignupMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyRestaurant");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR,cont/getSignupMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();

    const new_member = await member.signupData(data);

    req.session.member = new_member;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR,cont/signup, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getLoginMyRestaurant = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyRestaurant");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR,cont/getLoginMyRestaurant, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR,cont/login ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout  sahifadasiz");
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "you are not authenticated " });
  }
};
