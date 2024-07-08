import request from "supertest";
import app from "../server.js";
import { describe, it, before, after, beforeEach } from "mocha";
import { expect } from "chai";
import db from "../db/db.js";
import toks from "../utilities/tokens.js";
const { generateToken } = toks;
// FILEPATH: /c:/Users/HP/Videos/programming/hng/user_authentication_api/tests/auth.spec.js
before(async () => {
  await db.sync();
});
after(async () => {
  await db.close();
});
const testUserData = {
  firstName: "testFirstName",
  lastName: "testLastName",
  email: "test@email.com",
  password: "test",
  phone: "1111111111",
};

beforeEach(async () => {
  await db.truncate({ cascade: true });
});

describe("POST /auth/register", function () {
  this.timeout(15000);

  it("should register a new user and organisation", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send(testUserData);

    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal("Registration successful");
    expect(response.body.data).to.have.property("user");

    expect(response.body.data).to.have.property("accessToken");

    const resp = await request(app)
      .get("/api/organisations")
      .set("Authorization", `Bearer ${response.body.data.accessToken}`)
      .send(testUserData);

    expect(resp.status).to.equal(200);
    const name = resp.body.data.organisations[0].name;
    expect(name).to.equal("testFirstName's organisation");
  });

  it("should return an error if username is missing", async () => {
    // eslint-disable-next-line no-unused-vars
    const { firstName, ...incompleteData } = testUserData;
    const response = await request(app)
      .post("/auth/register")
      .send(incompleteData);

    expect(response.status).to.equal(422);
  });

  it("should return an error if password is missing", async () => {
    // eslint-disable-next-line no-unused-vars
    const { password, ...incompleteData } = testUserData;
    const response = await request(app)
      .post("/auth/register")
      .send(incompleteData);

    expect(response.status).to.equal(400);
    // expect(response.body.error).toBe("Password is required");
  });

  it("should return an error for duplicate email", async () => {
    await request(app).post("/auth/register").send(testUserData);

    const response = await request(app)
      .post("/auth/register")
      .send(testUserData);

    expect(response.status).to.equal(422);
  });
});

describe("POST /auth/login", function () {
  this.timeout(15000);
  beforeEach(async () => {
    await request(app).post("/auth/register").send(testUserData);
  });
  it("should login a user with valid credentials", async () => {
    const { email, password } = testUserData;
    const response = await request(app).post("/auth/login").send({
      email,
      password,
    });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Login successful");
    expect(response.body.data).to.have.property("accessToken");
    expect(response.body.data).to.have.property("user");
  });

  it("should return an error if email is missing", async () => {
    const { password } = testUserData;
    const response = await request(app).post("/auth/login").send({
      password,
    });

    expect(response.status).to.equal(401);
  });

  it("should return an error if password is missing", async () => {
    const { email } = testUserData;
    const response = await request(app).post("/auth/login").send({
      email,
    });

    expect(response.status).to.equal(401);
  });

  it("should return an error if credentials are invalid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "testuser",
      password: "wrongpassword",
    });

    expect(response.status).to.equal(401);
  });
});

describe("JWT Authentication", () => {
  let token;
  let expiredToken;

  beforeEach(async () => {
    await db.truncate({ cascade: true });
    const res = await request(app).post("/auth/register").send(testUserData);
    const { userId, email } = res.body.data;
    token = res.body.data.accessToken;

    // Generate expired token
    expiredToken = generateToken({ userId, email }, "1ms"); // Expired immediately
  });

  it("should allow access with a valid token", async () => {
    const response = await request(app)
      .get("/api/organisations") // Your protected route
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal(
      "successfully retrieved organisations"
    );
  });

  it("should deny access with an invalid token", async () => {
    const response = await request(app)
      .get("/api/organisations")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.status).to.equal(401);
  });

  it("should deny access with an expired token", async () => {
    const response = await request(app)
      .get("/api/organisations")
      .set("Authorization", `Bearer ${expiredToken}`);

    // console.log(response);
    expect(response.status).to.equal(403);
  });

  it("should deny access without a token", async () => {
    const response = await request(app).get("/api/organisations");

    expect(response.status).to.equal(401);
  });
});
