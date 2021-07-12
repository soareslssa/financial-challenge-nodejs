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
  // TODO Incluir lançamento de entrada - com valor positivo e descrição
  const { value, description } = request.body;

  const account = {
    id: uuid(),
    balance: value,
    moviment: [{ type: "entrance", value, description }]
  };

  accounts.push(account);
  return response.json(account);
});

app.post("/balance/entry/:id", (request, response) => {
  
  const {value, description} = request.body;
  const {id} = request.params;

  const accountIndex = accounts.findIndex(account => account.id == id);

  if (accountIndex < 0) {
    return response.status(400).json({error: "account not found."});
  }

  accounts[accountIndex].balance += value;
  accounts[accountIndex].moviment = [...accounts[accountIndex].moviment, {type: "entrance", value, description}];
 
  return response.json(accounts[accountIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
