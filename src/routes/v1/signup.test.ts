import * as supertest from "supertest";
import app from "../../startApp";
import connectDatabase from "../../db";

test("signup", () => {
  return connectDatabase(true, true)
    .then(() => {
      const request = supertest(app);
      return request.post("/api/v1/signup").send({
        email: "hoge",
        password: "hogehoge"
      });
    })
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });
});

describe("h", () => {
  it("i", () => {
    const i = 2 + 3;
    expect(i).toBe(5);
  });
});
