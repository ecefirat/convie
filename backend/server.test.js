const supertest = require("supertest");
const server = require("./server");
const request = supertest(server);

// import { render } from "@testing-library/react";

// it("Testing to see if Jest works", () => {
//   expect(1).toBe(1);
// });

// Mock cookie
let cookie;

// Mock login
beforeAll(async (done) => {
  // jest.setTimeout(10000);
  const res = await request.post("/login").send({
    email: "admin@admin.com",
    password: "1234Qwer",
  });
  // Mock cookie
  const cookies = res.headers["set-cookie"][0]
    .split(",")
    .map((item) => item.split(";")[0]);
  cookie = cookies.join(";");
  done();
});

describe("register user", () => {
  test("respond 200", async (done) => {
    const response = await request
      .post("/register")
      .set("Cookie", cookie)
      .send({
        first_name: "Jamie",
        last_name: "Xx",
        email: "jamie@xx.com",
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
      .set("Cookie", cookie)
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

describe("user login", () => {
  test("respond 200", async (done) => {
    const response = await request.post("/login").send({
      email: "admin@admin.com",
      password: "1234Qwer",
    });
    expect(response.status).toBe(200);
    done();
  });
});

describe("show the products", () => {
  test("respond 200", async (done) => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
    done();
  });
});

describe("testing address update", () => {
  test("respond 200", async (done) => {
    const response = await request
      .post("/customerAddress")
      .send({
        customer_address: "testing address",
      })
      .set("Cookie", cookie);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("testing address");
    done();
  });
});

describe("testing profile picture sending", () => {
  test("respond 200", async (done) => {
    const response = await request
      .post("/picture")
      .send({
        profile_picture: "http://localhost:5000/uploads/cat.jpeg",
      })
      .set("Cookie", cookie);
    expect(response.status).toBe(200);
    done();
  });
});

describe("testing profile picture update", () => {
  test("respond 200", async (done) => {
    const response = await request
      .post("/uploads")
      .send({
        profile_picture: "http://localhost:5000/uploads/cat.jpeg",
      })
      .set("Cookie", cookie);
    // expect(response.status).toBe(200);
    expect(response.body.message).toBe("image changed");
    done();
  });
});
