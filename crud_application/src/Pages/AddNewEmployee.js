import React from "react";
import { useState, useEffect } from "react";
import "./AddNewEmployee.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CloseButton } from "reactstrap";

const intialState = {
  name: "",
  email: "",
  contact: "",
  designation: "",
};

const AddNewEmployee = () => {
  const [state, setState] = useState(intialState);
  const { name, email, contact, designation } = state;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((res) => setState({ ...res.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !designation) {
      toast.error("Please Enter the all fields");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            name,
            email,
            contact,
            designation,
          })
          .then(() => {
            setState({
              name: "",
              email: "",
              contact: "",
              designation: "",
            });
          })
          .catch((error) => toast.error(error.response.data));
        toast.success("employee added succesfully");
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            name,
            email,
            contact,
            designation,
          })
          .then(() => {
            setState({
              name: "",
              email: "",
              contact: "",
              designation: "",
            });
          })
          .catch((error) => toast.error(error.response.data));
        toast.success("employee Updated succesfully");
      }
      setTimeout(() => navigate("/"), 500);
    }
  };
  const handleInputChange = (e, key) => {
    let newState = { ...state };
    newState[key] = e.target.value;
    setState(newState);
  };
  return (
    <div className="formBox">
      <h2 className="addh2">
        {id ? "EDIT EMPLOYEE DETAILS" : "ADD EMPLOYEE DETAILS"}
      </h2>
      <div>
        <Link to={"/"}>
          <CloseButton variant="black" className="closeIconAdd" />
        </Link>
      </div>
      <hr className="addhr"></hr>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="name">Name</label> */}
        <br></br>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the Name"
          value={name || ""}
          onChange={(e) => handleInputChange(e, "name")}
        />
        {/* <label htmlFor="email">Email</label> */}
        <br></br>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter the Email"
          value={email || ""}
          onChange={(e) => handleInputChange(e, "email")}
        />
        {/* <label htmlFor="contact">Contact</label> */}
        <br></br>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter the Contact Number"
          value={contact || ""}
          onChange={(e) => handleInputChange(e, "contact")}
        />

        {/* <label htmlFor="number">Designation</label> */}
        <br></br>
        <input
          type="text"
          id="designation"
          name="designation"
          placeholder="Enter the Designation"
          value={designation || ""}
          onChange={(e) => handleInputChange(e, "designation")}
        />
        <br></br>
        <input
          type="submit"
          value={id ? "EDIT Employee" : "Add New Employee"}
          onClick={handleSubmit}
        />
      </form>
      <Link to={"/"}>
        <button className="close">Close</button>
      </Link>
    </div>
  );
};

export default AddNewEmployee;
