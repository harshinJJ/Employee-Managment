const mongoose = require("mongoose");
const schema = mongoose.Schema;
const logindata = new schema({
  f_sno: { type: String, required: true },
  f_username: { type: String, required: true },
  f_pwd: { type: String, required: true },
  role: { type: Number, required: true },
   
});

const Logindata = mongoose.model("t_login", logindata);
module.exports = Logindata;
