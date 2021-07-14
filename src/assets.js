const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const assets = [];
const types = ["RV", "RF","FUNDO"];

app.get("/assets", (request, response) => {
  return response.json(assets);
});

app.post("/assets", (request, response) => {
  const { name, value, type } = request.body;
  const asset = {id: uuid(),name,value,type};

  if(value.toString().length > 8){
    return response.status(500).json({error: "The asset value must not exceed 8 decimal places"});
  }

  const typeIndex = types.findIndex(t => t === type);
  if(typeIndex < 0){
    return response.status(500).json({error: "Not valid asset type."});
  }

  assets.push(asset);
  return response.json(asset);
});

module.exports = app;
