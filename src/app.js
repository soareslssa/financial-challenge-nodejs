const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const accounts = [];

app.get("/accounts", (request, response) => {
  return response.json(accounts);
});

app.post("/balance/entry/", (request, response) => {
  const { value, description } = request.body;

  const account = {
    id: uuid(),
    balance: value,
    moviment: [{ type: "entrance", value, description }]
  };

  accounts.push(account);
  return response.json(account);
});

app.put("/balance/entry/:id", (request, response) => {
  
  const {value, description} = request.body;
  const {id} = request.params;

  const accountIndex = accounts.findIndex(account => account.id == id);

  if (accountIndex < 0) {
    return response.status(404).json({error: "account not found."});
  }

  accounts[accountIndex].balance += value;
  accounts[accountIndex].moviment = [...accounts[accountIndex].moviment, {type: "entrance", value, description}];
 
  return response.json(accounts[accountIndex]);
});

app.put("/balance/out/:id", (request, response) => {
  
  const {value, description} = request.body;
  const {id} = request.params;

  const accountIndex = accounts.findIndex(account => account.id == id);

  if (accountIndex < 0) {
    return response.status(404).json({error: "account not found."});
  }

  if((accounts[accountIndex].balance - value) < 0){
    return response.status(500).json({error: "the account does not have enough balance."});
  }

  accounts[accountIndex].balance -= value;
  accounts[accountIndex].moviment = [...accounts[accountIndex].moviment, {type: "out", value, description}];
 
  return response.json(accounts[accountIndex]);
});

module.exports = app;
