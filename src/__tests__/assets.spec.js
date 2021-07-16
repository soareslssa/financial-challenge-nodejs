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
        type: "FUNDO"
      });

    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      name: "apple45",
      value: 100,
      type: "FUNDO"
    });
  });
  
  it("The asset value must not exceed 8 decimal places", async () => {
    const response = await request(app)
      .post("/assets")
      .send({
        name: "apple45",
        value: 123456789,
        type: "FUNDO"
      });

    expect(response.body).toMatchObject({error: "The asset value must not exceed 8 decimal places"});
  });
  
  it("Should be valid asset type (RV,RF or FUNDO).", async () => {
    const response = await request(app)
      .post("/assets")
      .send({
        name: "apple45",
        value: 200.00,
        type: "TIPO_ERRADO"
      });

    expect(response.body).toMatchObject({error: "Not valid asset type."});
  });

  it("should be able to update asset", async () => {
    const asset = await request(app)
    .post("/assets")
    .send({
      name: "viavarejo15",
      value: 100,
      type: "RV"
    });

  
    const response = await request(app)
    .put(`/assets/${asset.body.id}`)
    .send({
      name: "petro20",
      value: 500,
      type: "RV"
    });
  
 
    expect(isUuid(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      id: asset.body.id,
      name: "petro20",
      value: 500,
      type: "RV"
    });
  });


/* it("should be able to delete asset", async () => {
  const asset = await request(app)
  .post("/assets")
  .send({
    name: "apple45",
    value: 100,
    type: "RV"
  });


  const response = await request(app)
  .delete(`/assets/${asset.body.id}`)
  .send({});

  expect(response.status).toMatchObject(200);
});
   */
});

