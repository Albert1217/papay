const Member = require("../models /Member");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body;
    const member = new Member();
    const new_member = await member.signupData(data);
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

memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.send("login  sahifadasiz");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("logout  sahifadasiz");
};
