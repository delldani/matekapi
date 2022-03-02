const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dbconnection = require("./dbconnection");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  dbconnection
    .getLatestScore(mysql)
    .then(function (row) {
      res.send(row);
      console.log(row);
    })
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
  dbconnection.saveData(mysql, req.body.date, req.body.score, req.body.failure);
});

app.listen(process.env.PORT || port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
