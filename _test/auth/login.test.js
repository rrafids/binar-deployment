const request = require("supertest");
const app = require("../../server");

describe("POST /auth/login", () => {
  it("should response with 200 as status code", async () => {
    const payload = {
      email: "user1@gmail.com",
      password: "User12345"
    }

    return request(app)
      .post("/auth/login")
      .send(payload) // send payload masih error
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data.registered_user).not.toEqual(null);
      });
  });
});
