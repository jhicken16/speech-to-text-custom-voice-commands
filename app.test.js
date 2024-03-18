const request = require('supertest')
const app = require('./app')

describe("POST /register", () => {

    describe("given email and password", () => {
        it("return 200 status code", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "testenv2@gmail.com",
                password: "testenv"
            })
            expect(response.statusCode).toBe(200)

        })
        it("return content type of json", async () => {
            const response = await request(app).post("/auth/register").send({
                email: "testenv3@gmail.com",
                password: "testenv"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})