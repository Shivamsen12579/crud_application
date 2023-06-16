const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:5000',
//     credentials:false,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shivam@1906",
  database: "curd_db",
});
connection.connect();

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM employee_db";
  connection.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/post", (req, res) => {
  const { id, name, email, contact, designation } = req.body;
  const sqlInsert =
    "INSERT INTO employee_db(id ,name,email,contact,designation) VALUES (?, ? ,? ,? ,?)";
  connection.query(
    sqlInsert,
    [id, name, email,contact,designation],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM employee_db WHERE id = ?";
  connection.query(sqlDelete, id, (error,result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM employee_db WHERE id = ?";
  connection.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact , designation } = req.body;
  const sqlUpdate =
    "UPDATE employee_db SET name = ? , email = ? , contact = ? , designation = ? WHERE id = ?";
  connection.query(
    sqlUpdate,
    [name, email, contact , designation, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO employee_db(id ,name,email,contact , designation) VALUES (12 , 'shivam sen' , 'shivamsen12579@gmail.com' , 7225099451 , 'Developer')";
  connection.query(sqlInsert, (err, result) => {
    console.log("error", err);
    console.log("result", result);
    res.send("Hello Express");
  });
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
