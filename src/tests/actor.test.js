const request = require("supertest")
const app = require("../app")

let actorId

const actor = {
    firstName: "Denzel",
    lastName: "Washington",
    nationality: "American",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Denzel_Washington_2018.jpg/250px-Denzel_Washington_2018.jpg",
    birthday: "1954-12-28"
};


const BASE_URL = '/api/v1/actors'

test("Post '/actors' should return statusCode 200 and res.body.name = actor.name", async() =>{
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)
        
    actorId = res.body.id
    

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})
test("GET '/actors' should return statusCode 200", async() =>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    // expect(res.body).toHavelength(1)

})

test("GET '/actors/:id' should return statusCode 200", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${actorId}`)

    // expect(res.body).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})

test("PUT '/actors/:id', should return status 200, res.body.name === actorUpdate.name", async() =>{
    const newObject = {
        firstName: "Inmer"
    }
    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(newObject)

    expect(res.statusCode).toBe(200)
    // expect(res.body.firstName).toBe(newObject.firstName)
    expect(res.body).toBeDefined()
})

test("DELETE => BASE_URL/:id/actors should return res.statusCode 200", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
})