import React, { useEffect, useState } from "react";
import "./Employeedetails.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Employeedetails = () => {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/employee/displayemployees")
      .then((data) => {
        setEmployee(data.data.employeedetail);
      });
  }, []);
  const filteredEmployee = employee.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleclick = (deleteid) => {
    axios
      .get(`http://localhost:8080/employee/deleteemployee/${deleteid}`)
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="searchbarposiotion ">
        <input
          type="text"
          className="inputsform1"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <span className="searchbarposiotion ">
        Total count: {employee.length}
      </span>
      <div className="tableposition">
        <table className="tablestyle">
          <thead className="tablestyle">
            <tr>
              <th className="tablestyle ">ID</th>
              <th className="tablestyle ">Image</th>
              <th className="tablestyle ">Name</th>
              <th className="tablestyle ">Email</th>
              <th className="tablestyle ">Mobile No</th>
              <th className="tablestyle ">Designation</th>
              <th className="tablestyle ">Gender</th>
              <th className="tablestyle ">Course</th>
              <th className="tablestyle ">Created Date</th>
              <th className="tablestyle ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.map((item) => (
              <tr>
                <td className="position tablestyle">{item._id}</td>
                <td className="position tablestyle">
                  <img
                    src={`/images/${item.f_image}`}
                    alt={`img of ${item.f_image}`}
                    className="imagesize"
                  />
                </td>
                <td className="position tablestyle">{item.f_name}</td>
                <td className="position tablestyle">{item.f_email}</td>
                <td className="position tablestyle">{item.f_mobile}</td>
                <td className="position tablestyle">{item.f_designation}</td>
                <td className="position tablestyle">{item.f_gender}</td>
                <td className="position tablestyle">{item.f_course}</td>
                <td className="position tablestyle">{item.f_createdate}</td>
                <td className="position tablestyle">
                  <Link className="linkingpart" to={`/editemp/${item._id}`}>
                    <button class="sign">Edit</button>
                  </Link>
                  <br />
                  <button
                    class="sign"
                    onClick={() => {
                      handleclick(item.f_email);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employeedetails;
