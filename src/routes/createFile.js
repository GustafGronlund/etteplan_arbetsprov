const express = require("express");
const router = express.Router();
const convert = require("xml-js");
const path = require("path");
const fs = require("fs");

router.get("/create-file", (req, res) => {
  const xmlFilePath = path.join(__dirname, "../data/sma_gentext.xml");
  const xmlFile = fs.readFileSync(xmlFilePath, "utf8");
  const jsonData = JSON.parse(
    convert.xml2json(xmlFile, { compact: true, spaces: 2 })
  );
  const targetNode = jsonData.root.file.body["trans-unit"].find(
    (unit) => unit._attributes.id === "42007"
  );
  const outputPath = path.join(__dirname, "../output/result.txt");
  if (targetNode && !fs.existsSync(outputPath)) {
    fs.writeFileSync(outputPath, targetNode.target._text);
    res.json({ message: "The file was successfully created." });
  } else if (fs.existsSync(outputPath)) {
    res.json({
      message:
        "The file 'result.txt' does already exists in the output directory.",
    });
  } else {
    res.json({ message: "Trans-unit with id 42007 was not found." });
  }
});

module.exports = router;
