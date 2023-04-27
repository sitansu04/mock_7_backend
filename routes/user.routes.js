const express = require("express");
const { Usermodel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authentication } = require("../middlewares/authentication.middleware");
const userRouter = express.Router();
// ---------------------------checking------------------->
userRouter.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "User Router is working" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// ------------------------------------Signup/register----------------->

userRouter.post("/register", async (req, res) => {
  const { img, name, bio, phone, email, password } = req.body;
  try {
    const exist_user = await Usermodel.findOne({ email: email });
    if (exist_user) {
      res.status(400).send({ msg: `User already Exists please try to login` });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err.message });
          console.log(err);
        } else {
          const new_user = new Usermodel({
            img,
            name,
            bio,
            phone,
            email,
            password: hash,
          });
          await new_user.save();
          res.status(200).send({ msg: `${name} register Successfully ` });
        }
      });
    }
    // res.status(200).send("register");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// ----------------------------------------Login-------------------------->

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.findOne({ email: email });
    const hash_pass = user.password;
    console.log(hash_pass);
    if (user) {
      bcrypt.compare(password, hash_pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "sitansu");
          res
            .status(200)
            .send({ msg: `User logged in Successfull`, token: token });
        } else {
          res.status(400).send({ msg: `Login Failed` });
        }
      });
    } else {
      res.status(400).send({ msg: `User does not exists please register` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
//--------------------------------------Profile Details------------------->

userRouter.get("/getProfile", authentication, async (req, res) => {
  const userID = req.body.ID;
  try {
    // console.log(userID)
    const user = await Usermodel.findOne({ _id: userID });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
//---------------------------------------edit details--------------------------------->

userRouter.patch("/edit", authentication, async (req, res) => {
  const userId = req.body.ID;
  const payload = req.body;
  try {
    const user = await Usermodel.findOne({ _id: userId });
    if (user) {
      const updated_user = await Usermodel.findByIdAndUpdate(
        { _id: userId },
        payload
      );
      res.status(200).send({ msg: `${user.name} profile updated successfull` });
    }else{
        res.status(400).send({ msg: `User not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});
//---------------------------------------export function----------------------------->

module.exports = {
  userRouter,
};
