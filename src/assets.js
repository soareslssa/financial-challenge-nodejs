const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const assets = [];

app.get("/assets", (request, response) => {
  return response.json(assets);
});

app.post("/assets", (request, response) => {
  const { name, value, type } = request.body;
  const asset = {id: uuid(),name,value,type};

  assets.push(asset);
  return response.json(asset);
});

module.exports = app;
