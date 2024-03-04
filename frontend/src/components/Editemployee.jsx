import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Editemployee = () => {
  const [formError, setFormError] = useState({});
  const [speemp, setSpeemp] = useState({});
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

  const { userid } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/employee/specificemployee/${userid}`)
      .then((data) => {
        setSpeemp(data.data.specificemp);
      });
  }, []);

  const formData = new FormData();
  formData.append("email", input.email);
  formData.append("name", input.name);
  formData.append("mobile", input.mobile);
  formData.append("designation", input.designation);
  formData.append("course", input.course);
  formData.append("gender", input.gender);
  formData.append("f_image", input.f_image);

  const handlechange = (event) => {
    const { name, type, value, files } = event.target;
    if (type === "file" && files.length > 0) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = files[0].name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        console.log("Invalid file type. Please upload a JPG or PNG file.");
      }
    }
    setInput((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    setFormError(formValidate(input));

    axios
      .post(
        `http://localhost:8080/employee/editemployeedetails/${userid}`,
        formData
      )
      .then((data) => {
        console.log(data);
        navigate("/empdetails");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function formValidate(values) {
    var error = {};

    if (values.email === "") {
      error.email = "enter a email";
    }
    if (values.password === "") {
      error.password = "invalid password address cant be empty";
    }
    return error;
  }
  return (
    <div>
      <div className="backcolor">
        <section class="formsection">
          <div class="form-container">
            <p class="title">Edit Employee</p>
            <form
              class="form"
              onSubmit={(event) => handlesubmit(event)}
              encType="multipart/formdata"
            >
              <div class="input-group">
                <label for="username">Email</label>
                <input
                  type="email"
                  style={{ borderColor: formError.username ? "red" : "" }}
                  name="email"
                  id="email"
                  placeholder={speemp.f_email}
                  class="inputsform"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, email: "" });
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
                  placeholder={speemp.f_name}
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
                  placeholder={speemp.f_mobile}
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
                  placeholder={speemp.f_designation}
                  class="inputsform"
                  name="designation"
                  onChange={handlechange}
                  onClick={() => {
                    setFormError({ ...formError, designation: "" });
                  }}
                >
                  <option value="">{speemp.f_designation}</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div class="input-group">
                <label for="gen">Gender</label>
                <input
                  type="text"
                  placeholder={speemp.f_gender}
                  class="inputsform"
                />
              </div>
              <div class="input-group">
                <label for="gender">
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
                <div class="input-group">
                  <label for="cour">Course</label>
                  <input
                    type="text"
                    placeholder={speemp.f_course}
                    class="inputsform"
                  />
                </div>
              </div>
              <div class="input-group">
                <label for="course">
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
                  accept="image/*"
                  name="f_image"
                  onChange={handlechange}
                />
              </div>

              <br />

              <button type="submit" class="sign">
                Edit
              </button>
            </form>
            <br />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Editemployee;
