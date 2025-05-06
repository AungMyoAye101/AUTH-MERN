const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index.js"); // Adjust if your app is in a different file
const User = require("../models/User.model.js");

describe("User", () => {
    const testUser = {
        name: "Testla",
        email: "testla@gmail.com",
        password: "Testla101",
    };

    let cookie;
    let userId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);

        // Create a test user
        const user = await User.create(testUser);
        userId = user._id;

        // Log in the test user to get the cookie
        const loginRes = await request(app)
            .post("/api/v1/auth/login")
            .send({ email: testUser.email, password: testUser.password });
        cookie = loginRes.headers["set-cookie"];
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    it("Should check if user is already logged in", async () => {
        const res = await request(app).get("/api/v1/account/me").set("Cookie", cookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User already logged in");
    });

    it("Should get all users", async () => {
        const res = await request(app).get("/api/v1/account/users").set("Cookie", cookie);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Get all users successful");
    });

    it("Should get a user", async () => {
        const res = await request(app)
            .post("/api/v1/account/getUser")
            .set("Cookie", cookie)
            .send({ id: userId });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Get a user success");
    });
});