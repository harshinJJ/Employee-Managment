const mongoose = require("mongoose");
const schema = mongoose.Schema;
const employeedata = new schema({
  f_name: { type: String, required: true },
  f_email: { type: String, required: true },
  f_mobile: { type: String, required: true },
  f_designation: { type: String, required: true },
  f_gender: { type: String, required: true },
  f_course: { type: String, required: true },
  f_image: { type: String, required: true },
  f_createdate: { type: Date, default: Date.now },
});

const Employeedata = mongoose.model("t_employee", employeedata);
module.exports = Employeedata;
