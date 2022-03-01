const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dbconnection = require("./dbconnection");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/", (req, res) => {
  console.log(req.body.date);
  res.send("Got a POST request");
  dbconnection.saveData(mysql, req.body.date, req.body.score);
  // dbconnection.getData(mysql);
});

app.listen(process.env.PORT || port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
