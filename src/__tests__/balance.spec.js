const request = require("supertest");
const app = require("../app");
const { validate: isUuid } = require("uuid");

describe("Balances", () => {
  it("should be able to create a new balance", async () => {
    const response = await request(app)
      .post("/balance/entry")
      .send({
        account: "1272967-1",
        value: "500.00",
        description: "university payment"
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      account: "1272967-1",
      value: "500.00",
      description: "university payment"
    });
  });
});