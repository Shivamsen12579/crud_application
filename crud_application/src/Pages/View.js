import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './View.css';
// import { CloseButton } from "react-toastify/dist/components";
// import {} from ""
// import React from 'react';
import { CloseButton } from 'reactstrap';
const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);
  return (
    <div className="viewcontainer">
      <div className="containerBox">
        <h2 className="viewh2">View Employee Details</h2>
        <div >
  <Link to={"/"}>
  <CloseButton variant="black"className="closeIcon" />
  </Link>
</div>
        <hr></hr>
      </div>
      {/* <p className="viewp">{id}</p> */}
      <p className="viewp">{user.name}</p>
      <p className="viewp">{user.email}</p>
      <p className="viewp">{user.contact}</p>
      <p className="viewp">{user.designation}</p>
      <Link to={"/"}>
        <button className="viewbtn">Close</button>
      </Link>
    </div>
  );
};

export default View;
