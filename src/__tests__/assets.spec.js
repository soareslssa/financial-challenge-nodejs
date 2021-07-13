const request = require("supertest");
const app = require("../assets");
const { validate: isUuid } = require("uuid");

describe("Assets", () => {
  it("should be able to create a new asset", async () => {
    const response = await request(app)
      .post("/assets")
      .send({
        name: "apple45",
        value: 100,
        type: "teste"
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      name: "apple45",
      value: 100,
      type: "teste"
    });
  });
  
  it("The asset value must not exceed 8 decimal places", async () => {
    const response = await request(app)
      .post("/assets")
      .send({
        name: "apple45",
        value: 123456789,
        type: "teste"
      });

    expect(response.body).toMatchObject({error: "The asset value must not exceed 8 decimal places"});
  });
});
