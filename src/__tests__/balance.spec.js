const request = require("supertest");
const app = require("../app");
const { validate: isUuid } = require("uuid");

describe("Balances", () => {
  it("should be able to create a new balance", async () => {
    const response = await request(app)
      .post("/balance/entry")
      .send({
        value: 500.00,
        description: "university payment"
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      balance: 500.00,
     moviment: [{type: "entrance", value: 500.00, description: "university payment"}]
    });
  });
});

it("should be able to list the accounts", async () => {
  const account = await request(app)
  .post("/balance/entry")
  .send({
    value: 500.00,
    description: "university payment"
  });

  const response = await request(app).get("/accounts");

  expect(response.body).toEqual(
    expect.arrayContaining([
      {
        id: account.body.id,
        balance: 500.00,
        moviment: [{type: "entrance", value: 500.00, description: "university payment"}],
      }
    ])
  );
});

it("should be able to include entry", async () => {
  const account = await request(app)
  .post("/balance/entry")
  .send({
    value: 500.00,
    description: "university payment"
  });

  const response = await request(app)
  .put(`/balance/entry/${account.body.id}`)
  .send({
    value: 300.00,
    description: "grocery shopping"
  });

  expect(isUuid(response.body.id)).toBe(true);

  expect(response.body).toMatchObject({
    id: account.body.id,
        balance: 800.00,
        moviment: [
          {type: "entrance", value: 500.00, description: "university payment"},
          {type: "entrance", value: 300.00, description: "grocery shopping"}
          ],
  });
});

it("should be able to include out", async () => {
  const account = await request(app)
  .post("/balance/entry")
  .send({
    value: 500.00,
    description: "university payment"
  });

  const response = await request(app)
  .put(`/balance/out/${account.body.id}`)
  .send({
    value: 300.00,
    description: "grocery shopping"
  });

  expect(isUuid(response.body.id)).toBe(true);

  expect(response.body).toMatchObject({
    id: account.body.id,
        balance: 200.00,
        moviment: [
          {type: "entrance", value: 500.00, description: "university payment"},
          {type: "out", value: 300.00, description: "grocery shopping"}
          ],
  });
});

it("The balance must never be negative", async () => {
  const account = await request(app)
    .post("/balance/entry")
    .send({
      value: 500.00,
      description: "university payment"
    });

  const response = await request(app)
    .put(`/balance/out/${account.body.id}`)
    .send({
      value: 600.00,
      description: "grocery shopping"
    });

  expect(response.body).toMatchObject({ error: "the account does not have enough balance." });
});