const Member = require("../models /Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    member = new Member();
    new_member = await member.signupData(data);
    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR,cont/signup ${err.message}`);
    if (err.message === "mb_nick is already in use") {
      res
        .status(400)
        .json({ state: "fail", message: "this member is already in use" });
    }
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body;
    member = new Member();
    result = await member.loginData(data);
    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR,cont/login ${err.message}`);
    if (err.message === "mb_nick is already in use") {
      res
        .status(400)
        .json({ state: "fail", message: "this member is already in use" });
    }
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout  sahifadasiz");
};
