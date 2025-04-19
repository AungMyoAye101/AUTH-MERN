const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../index.js")// Adjust if your app is in a different file
const User = require('../models/User.model.js');

describe('Auth API', () => {
    const testUser = {
        name: 'Test User',
        email: 'testuser2@example.com',
        password: 'test1234'
    };
    let userId;
    let cookie;
    let otp;
    beforeAll(async () => {
        // Connect to test DB (make sure it's a separate test database)
        await mongoose.connect(process.env.MONGODB_URI);
    });

    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });

    it('should register a user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send(testUser);
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe(testUser.email);
        userId = res.body.user._id;
        cookie = res.headers['set-cookie'][0]
    });

    it('should not register with existing email', async () => {
        const res = await request(app).post('/api/v1/auth/register').send(testUser);
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should login the user', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: testUser.email,
            password: testUser.password
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.email).toBe(testUser.email);
    });

    it('should not login with incorrect password', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: testUser.email,
            password: 'wrongpass'
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should logout successfully', async () => {
        const res = await request(app).post('/api/v1/auth/logout');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    it("should update succefully", async () => {
        const updateRes = await request(app).put(`/api/v1/auth/update/${userId}`).send({ "name": "User Updated" });
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.success).toBe(true)
        expect(updateRes.body.user.name).toBe("User Updated")
    })
    it("should send OTP successfull", async () => {
        const res = await request(app).post('/api/v1/auth/verify').set("Cookie", cookie)
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.message).toBe("Verification code has been send")
        otp = res.body.user.verifyOtp
    })
    it("should send email verification successfull", async () => {
        const res = await request(app).post('/api/v1/auth/verify_email').set("Cookie", cookie).send({ "otp": otp })
        expect(res.statusCode).toBe(200)
        expect(res.body.success).toBe(true)
        expect(res.body.message).toBe("Your account has been verified!")
    })
});
