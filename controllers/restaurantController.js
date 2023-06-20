const session = require("express-session");
const Member = require("../models/Member");
const Product = require("../models/Product");
const Definer = require("../lib/mistake");
const assert = require("assert");

let restaurantController = module.exports;

restaurantController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR,cont/home, ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.getMyRestaurantProducts = async (req, res) => {
  try {
    console.log("GET: cont/getMyRestaurantProducts");
    const product = new Product();
    const data = await product.getAllProductsDataResto(res.locals.member);
    res.render("restaurant-menu", { restaurant_data: data });
  } catch (err) {
    console.log(`ERROR,cont/getMyRestaurantProducts, ${err.message}`);
    req.redirect("/resto");
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
    console.log("POST: cont/signupProcess");
    assert(req.file, Definer.general_err3);
    let new_member = req.body;
    new_member.mb_type = "RESTAURANT";
    new_member.mb_image = req.file.path;
    const member = new Member();

    const result = await member.signupData(new_member);
    assert(result, Definer.general_err1);

    req.session.member = result;
    res.redirect("/resto/products/menu");
  } catch (err) {
    console.log(`ERROR,cont/signupProcess, ${err.message}`);
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
    console.log("POST: cont/loginProcess");
    const data = req.body;
    const member = new Member();
    const result = await member.loginData(data);

    req.session.member = result;
    req.session.save(function () {
      result.mb_type === "ADMIN"
        ? res.redirect("/resto/all-restaurant")
        : res.redirect("/resto/products/menu");
    });
  } catch (err) {
    console.log(`ERROR,cont/loginProcess ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.logout = (req, res) => {
  try {
    console.log("GET cont/logout");
    req.session.destroy(function () {
      res.redirect("/resto");
    });
  } catch (err) {
    console.log(`ERROR,cont/logout ${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

restaurantController.validateAuthRestaurant = (req, res, next) => {
  if (req.session?.member?.mb_type === "RESTAURANT") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authenticated members with restaurant type",
    });
};

restaurantController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "succed", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "you are not authenticated " });
  }
};
