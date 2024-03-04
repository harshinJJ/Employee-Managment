import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Employeeaddingform.css";
import { useNavigate } from "react-router-dom";

const Employeeaddingform = () => {
  const [formError, setFormError] = useState({});
  const [input, setInput] = useState({
    username: "",
    name: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    f_image: null,
  });
  const navigate = useNavigate();

  const handlechange = (event) => {
    const { name, type, value, files } = event.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handlePhotochange = (event) => {
    const { files } = event.target;
    setInput({ ...input, f_image: files[0] });
  };

  function formValidate(values) {
    var error = {};

    if (values.username === "") {
      error.username = "cant be empty";
    }
    if (values.name === "") {
      error.name = "cant be empty";
    }
    if (values.mobile === "") {
      error.mobile = "cant be empty";
    }
    if (values.designation === "") {
      error.designation = "cant be empty";
    }
    return error;
  }

  const handlesubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    setFormError(formValidate(input));

    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("name", input.name);
    formData.append("mobile", input.mobile);
    formData.append("designation", input.designation);
    formData.append("course", input.course);
    formData.append("gender", input.gender);
    formData.append("f_image", input.f_image);

    try {
      const response = await axios.post(
        "http://localhost:8080/employee/addingemployee",
        formData
      );

      console.log(response);
      // if (response.status === 200) {
      //   setTimeout(() => {
      //     toast.success("Registered successful", {
      //       position: "top-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //       theme: "colored",
      //     });
      //   }, 2000);

      //   setTimeout(() => {
      //     navigate("/empdetails");
      //   }, 4000);
      // } else {
      //   console.log("Failed to register. Please try again.");
      // }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <div className="backcolor">
        <section class="formsection">
          <ToastContainer />

          <div class="form-container">
            <p class="title">Create Employee</p>
            <form class="form" encType="multipart/formdata">
              <div class="input-group">
                <label for="username">Email</label>
                <input
                  type="email"
                  style={{ borderColor: formError.username ? "red" : "" }}
                  name="username"
                  placeholder=""
                  class="inputsform"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, username: "" });
                  }}
                />
              </div>
              <div class="input-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  style={{ borderColor: formError.name ? "red" : "" }}
                  name="name"
                  id="name"
                  placeholder=""
                  class="inputsform"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, name: "" });
                  }}
                />
              </div>
              <div class="input-group">
                <label for="mobile">Mobile No</label>
                <input
                  type="number"
                  name="mobile"
                  style={{ borderColor: formError.mobile ? "red" : "" }}
                  id="mobile"
                  placeholder=""
                  class="inputsform"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, mobile: "" });
                  }}
                />
              </div>
              <div class="input-group">
                <label for="designation">Designation</label>
                <select
                  id="designation"
                  style={{ borderColor: formError.designation ? "red" : "" }}
                  class="inputsform"
                  name="designation"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, designation: "" });
                  }}
                >
                  <option value="">----------Select----------</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div class="input-group">
                <label for="gender">
                  Gender:
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      onChange={handlechange}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      onChange={handlechange}
                    />
                    Female
                  </label>
                </label>
              </div>
              <div class="input-group">
                <label for="course">
                  Course:
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="MCA"
                      onChange={handlechange}
                    />
                    MCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="BCA"
                      onChange={handlechange}
                    />
                    BCA
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="course"
                      value="BSC"
                      onChange={handlechange}
                    />
                    BSC
                  </label>
                </label>
              </div>
              <div class="input-group">
                <label for="f_image">Upload Image</label>
                <input
                  className="inputsform"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  name="f_image"
                  onChange={handlePhotochange}
                />
              </div>

              <br />

              <button type="button" onClick={handlesubmit} class="sign">
                Create
              </button>
            </form>
            <br />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Employeeaddingform;
