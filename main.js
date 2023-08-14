const express = require("express");
const convert = require("xml-js");
const createFileRoute = require("./src/routes/createFile.js");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/create-file", createFileRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
