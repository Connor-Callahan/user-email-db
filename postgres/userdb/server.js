const tracer = require("dd-trace").init({
  logInjection: true,
  runtimeMetrics: true,
  analytics: true
});
const formats = require('dd-trace/ext/formats');

const express = require("express");
const winston = require("winston");

const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

const cors = require('cors');

// custom logging configuration 

const logger = require("./logservice.js");
// const logger = new Logger("app");


app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);


app.listen(port, () => {
  logger.info(`App launched on port ${port}.`);
});

