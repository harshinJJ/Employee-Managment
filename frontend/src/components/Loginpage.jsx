import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Loginpage = () => {
  const [formError, setFormError] = useState({});

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    setFormError(formValidate(input));
    axios.post("http://localhost:8080/admin/adminlogin", input).then((data) => {
      console.log(data);

      sessionStorage.setItem("username", data.data.logindata.f_username);

      sessionStorage.setItem("role", data.data.logindata.role);
      navigate("/home");
      window.location.reload();
    });
  };
  function formValidate(values) {
    var error = {};

    if (values.username === "") {
      error.username = "enter a email";
    }
    if (values.password === "") {
      error.password = "invalid password address cant be empty";
    }

    return error;
  }
  return (
    <div className="backcolor">
      <section class="formsection">
        <div class="form-container">
          <p class="title">LOGIN</p>
          <form class="form" onSubmit={handlesubmit}>
            <div class="input-group">
              <label for="username">Email</label>
              <input
                type="email"
                style={{ borderColor: formError.username ? "red" : "" }}
                name="username"
                id="email"
                placeholder=""
                class="inputsform"
                onChange={handlechange}
                onClick={() => {
                  setFormError({ ...formError, username: "" });
                }}
              />
            </div>
            <div class="input-group">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                style={{ borderColor: formError.password ? "red" : "" }}
                id="password"
                placeholder=""
                class="inputsform"
                onChange={handlechange}
                onClick={() => {
                  setFormError({ ...formError, password: "" });
                }}
              />
            </div>
            <br />

            <button class="sign">Sign in</button>
          </form>
          <br />
        </div>
      </section>
    </div>
  );
};

export default Loginpage;
