import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
// import RegisterModal from "../Components/RegisterModal";
const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async () =>
    axios.get("http://localhost:5000/api/get").then((res) => {
      console.log(res.data);
      setData(res.data);
    });

  useEffect(() => {
    loadData();
  });
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete")) {
      axios.delete(`http://localhost:5000/api/delete/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  
  return (
    <div className="homediv">
      <Link to={"/addnewemployee"}>
        <button className="new">
          Add New Employee
        </button>
      </Link>
      <div className="tableHome">
        <table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, key) => {
              return (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.designation}</td>
                  <td>
                    <Link to={`/view/${item.id}`}>
                      <button className="Home-Btn view-Btn">View</button>
                    </Link>
                    <Link to={`/update/${item.id}`}>
                      <button className="Home-Btn edit-Btn">Edit</button>
                    </Link>
                    <Link>
                      <button
                        className="Home-Btn delete-Btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
