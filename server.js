const express = require("express");
const bodyParser = require("body-parser");
const ping = require("./routes/ping.js");
const query = require("./routes/query.js");

// Set up Express
const app = express();

// Body parser
app.use(bodyParser.json());
app.set("json space", 2);

const PORT = process.env.PORT || 3000;

// API Routes - Will cache the post routes for 1 minute
app.use("/api", ping);
app.use("/api", query);

let server = app.listen(PORT, function () {
  console.log(`Server is starting at ${PORT}`);
});

module.exports = server;
