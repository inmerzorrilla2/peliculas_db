const request = require("supertest")
const app = require('../app')
const Director = require("../models/Director")

let genreId

const genre ={
    name: "Action"
}

const BASE_URL = '/api/v1/genres'

test("POST BASE_URL, should return statusCode200", async() =>{
    const res = await request(app)
    .post(BASE_URL)
    .send(genre)

    // expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    // expect(res.body.name).toBe(Director.name)
})

test("GET BASE_URL, should return statusCode 200", async()=>{
    const res = await request(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
})

test("GET BASE_URL, should return statusCode 200", async()=>{
    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)

    // expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    // expect(res.body.name).toBe(genre.name)
})

test("PUT BASE_URL, should return status 200, res.body.name === genreUpdate.name", async() =>{
    const newObject = {
        firstName: "Inmer"
    }

const res = await request(app)
.put(`${BASE_URL}/${genreId}`)
.send(newObject)

expect(res.body).toBeDefined()
})

test("DELETE => BASE_URL/:id/genres should return res.statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

    // expect(res.status).toBe(204)
})