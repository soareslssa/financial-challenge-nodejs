const request = require("supertest");
const app = require("../app");
const { validate: isUuid } = require("uuid");

describe("Balances", () => {
  it("should be able to create a new balance", async () => {
    const response = await request(app)
      .post("/balance/entry")
      .send({
        value: "500.00",
        description: "university payment"
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      balance: "500.00",
     moviment: [{type: "entrance", value: "500.00", description: "university payment"}]
    });
  });
});