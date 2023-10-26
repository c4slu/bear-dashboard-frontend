const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const host = process.env.HOST;
const port = process.env.PORT;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const db = mysql.createPool({
  host: host,
  user: user,
  password: password,
  database: database,
});

app.use(cors());
app.use(express.json());

app.get("/GetData");

app.listen(3001, () => {
  console.log("Running...");
});
