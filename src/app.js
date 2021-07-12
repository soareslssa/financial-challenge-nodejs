const express = require("express");
const cors = require("cors");

 const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const balances = [];

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/balance/entry", (request, response) => {
  // TODO Incluir lançamento de entrada - com valor positivo e descrição
  const {account, value, description} = request.body;

  const balance = {id: uuid(),account, value, description};
  balances.push(balance);

  return response.json(balance);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
