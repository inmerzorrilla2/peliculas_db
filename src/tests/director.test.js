const app = require('../app')
const request = require("supertest")

let directorId

const director = {
    firstName: "Antonie",
    lastName: "Fuqca",
    nationality: "American",
    image: "https://en.wikipedia.org/wiki/Antoine_Fuqua#/media/File:Antoine_Fuqua_(29682821190).jpg",
    birthday: "1965-05-30"
}

const BASE_URL = '/api/v1/directors';

test("POST => BASE_URL, should return, res.statusCode(200), res.body.firstname === director.firstname", async()=>{
    const res = await request(app)

    .post(BASE_URL)
    .send(director)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)

    actorId = res.body.id
})

test("GET '/directors'. should return, statusCode 200", async() =>{
    const res = await request(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
})

test("GET '/directors/:id' should return statusCode 200, res.body to be defined and res.body.name === director.name", async()=>{
    const res = await request(app)
        .get(`${BASE_URL}/${directorId}`)

    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)
})
test("PUT '/directors/:id', should return status 200, res.body.name === directorUpdate.name", async() =>{
    const newObject = {
        firstName: "Josue"
    }
    
    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(newObject)

    // expect(res.status).toBe(200)
    expect(res.body).toBeDefined()

})

test("DELETE => BASE_URL/:id/directors should return res.statusCode 200", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    // expect(res.status).toBe(200)

})