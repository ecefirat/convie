const supertest = require("supertest");
const server = require("./server");
const request = supertest(server);

// import { render } from "@testing-library/react";

// it("Testing to see if Jest works", () => {
//   expect(1).toBe(1);
// });

// Mock cookie
// let cookie;

// // Mock login
// beforeAll(async (done) => {
//   const res = await request.post("/login").send({
//     email: "BobMarley@gmail.com",
//     password: "Hello123",
//   });
//   // Mock cookie
//   const cookies = res.headers["set-cookie"][0]
//     .split(",")
//     .map((item) => item.split(";")[0]);
//   cookie = cookies.join(";");
//   done();
// });

describe("register user", () => {
  test("respond 200", async (done) => {
    const response = await request
      .post("/register")
      // .set("Cookie", cookie)
      .send({
        first_name: "Jamie",
        last_name: "Xxx",
        email: "jamie@xxx.com",
        password: "1234Qwer",
      });
    expect(response.status).toBe(200);
    done();
  });
});

describe("can't register - email exists", () => {
  test("respond 409", async (done) => {
    const response = await request
      .post("/register")
      // .set("Cookie", cookie)
      .send({
        first_name: "Qwer",
        last_name: "Qwer",
        email: "admin@admin.com",
        password: "1234Qwer",
      });
    expect(response.status).toBe(409);
    done();
  });
});
