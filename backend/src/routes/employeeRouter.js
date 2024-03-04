const express = require("express");
const multer = require("multer");
const Employeedata = require("../model/Employeedata");
const employeeRouter = express.Router();
// "../appointment-scheduler/public/uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

employeeRouter.post(
  "/addingemployee",
  upload.single("f_image"),
  async (req, res) => {
    try {
      const oldEmail = await Employeedata.findOne({
        f_email: req.body.email,
      });
      if (oldEmail) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "email already exists",
        });
      }
      const employeedatas = {
        f_name: req.body.name,
        f_email: req.body.email,
        f_mobile: req.body.mobile,
        f_designation: req.body.designation,
        f_gender: req.body.gender,
        f_course: req.body.course,
        f_image: req.file.filename,
      };
      const employee = await Employeedata(employeedatas).save();
      console.log(employee);
      return res.status(200).json({
        success: true,
        error: false,
        message: "Registration Successful",
        employeedata: employee,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: true,
        message: "internal server error",
        error: error,
        errormessage: error.message,
      });
    }
  }
);

employeeRouter.post("/displayemployees", async (req, res) => {
  try {
    const employeedetails = await Employeedata.find();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Successful",
      employeedetail: employeedetails,
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
employeeRouter.get("/specificemployee/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const specificemp = await Employeedata.findOne({ _id: userid });
    return res.status(200).json({
      success: true,
      error: false,
      message: "edited successfully",
      specificemp: specificemp,
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

employeeRouter.post(
  "/editemployeedetails/:userid",
  upload.single("f_image"),
  async (req, res) => {
    try {
      const userid = req.params.userid;
      console.log(userid);
      const employeedatas = {
        f_name: req.body.name,
        f_email: req.body.email,
        f_mobile: req.body.mobile,
        f_designation: req.body.designation,
        f_gender: req.body.gender,
        f_course: req.body.course,
        f_image: req.file.filename,
      };
      const updatedemployeedetail = await Employeedata.updateOne(
        {_id: userid },
        { $set: employeedatas }
      );
      console.log(updatedemployeedetail);
      return res.status(200).json({
        success: true,
        error: false,
        message: "edited successfully",
        updatedemployeedata: updatedemployeedetail,
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
  }
);
employeeRouter.get("/deleteemployee/:email", async (req, res) => {
  try {
    emailid = req.params.email;
    const deleteemployee = await Employeedata.deleteOne({ f_email: emailid });
    return res.status(200).json({
      success: true,
      error: false,
      message: "employee deleted",
      deletedemployee: deleteemployee,
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

module.exports = employeeRouter;
