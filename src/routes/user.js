const express = require("express");
const router = express.Router();
const User = require("../app/models/user");

router.post("/post", async (req, res) => {
  try {
    const { name, password } = req.body;
    if (name === "admin" && password === "admin") {
      return res.status(200).json("welcome");
    }
    if (!(name && password)) {
      return res.status(200).json("please enter a name and password");
    }
    const checkUser = await User.findOne({ name, password });
    if (checkUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }
    const user = new User({ name, password });
    await user.save();
    return res.status(201).json({
      message: "User created succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
module.exports = router;
