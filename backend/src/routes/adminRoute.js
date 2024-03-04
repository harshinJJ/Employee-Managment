const express = require("express");
const Logindata = require("../model/Logindata");
const { Admin } = require("mongodb");
const Bcrypt = require("bcryptjs");
const adminRouter = express.Router();

adminRouter.post("/admindata", async (req, res) => {
  try {
    const hashedpwd = await Bcrypt.hash(req.body.password, 12);
    const admindata = {
      f_sno: req.body.serialnumber,
      f_username: req.body.username,
      f_pwd: hashedpwd,
      role: 1,
    };
    const Admindetails = await Logindata(admindata).save();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Registration Successful",
      logindetail: Admindetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "internal server error",
      error: error,
      errormessage: error.message,
    });
  }
});

adminRouter.post("/adminlogin", async (req, res) => {
  try {
    const validatelogin = await Logindata.findOne({
      f_username: req.body.username,
    });
    const validatepassword = validatelogin.f_pwd;
    const passwordfromform = req.body.password;
    const comparepwd = await Bcrypt.compare(passwordfromform, validatepassword);

    if (!validatelogin) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "user not exists",
      });
    }
    if (!comparepwd) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "incorrect password",
      });
    } else {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Login success",
        logindata: validatelogin,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "internal server error",
      error: error,
      errormessage: error.message,
    });
  }
});

module.exports = adminRouter;
