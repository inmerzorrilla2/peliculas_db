require('../models')
const modelsActor = require('../models/Actor')
const Director = require('../models/Director')
const Genres = require('../models/Genre')


const request = require("supertest")
const app = require("../app")

let movieId

const movie = {
    name: "Training day",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b3/Training_Day_Poster.jpg",  
    synopsis: "Training Day is a 2001 American crime thriller film directed by Antoine Fuqua and written by David Ayer.",     
    releaseYear: 2001    
};


const BASE_URL = '/api/v1/movies'

test("POST '/movies' should return statusCode 200 and res.body.name = movie.name", async()=>{
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET '/movies' should return statusCode 200", async() => {

    const res = await request(app)
        .get(BASE_URL)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].genres[0]).toBe()


})

test("GET BASE_URL/movies/:id, should return statusCode 200, res.body to be defined and res.body.name === movie.name", async() => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)
    // console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})
test("PUT => BASE_URL/movies/:id, should return statusCode 200, res.body.name === studentUpdate.name", async() =>{
    const movieUpdate = {
        name: "Training day2"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)
        console.log(res)
        console.log('Id-de-movie', movieId)
        // expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.name).toBe(movieUpdate.name)
        
})

// POST /movies/:id/actors

test("POST => BASE_URL, should return statusCode 200", async()=>{
    const actor = {
        firstName: "Denzel",
        lastName: "Washington",
        nationality: "American",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Denzel_Washington_2018.jpg/250px-Denzel_Washington_2018.jpg",
        birthday: "1954-12-28"
    };
    const firstActor = await modelsActor.create(actor)
    const res = await request(app)

    .post(`${BASE_URL}/${movieId}/actors`)

    .send([firstActor.id])
    console.log(res)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    // expect(res.body[0].id).toBe(firstActor)
    // expect(res.body[0].id).toBeDefined()

    // expect(res.body).toBe(actorId.name)
    await firstActor.destroy()
})

// POST /movies/:id/directors
test("POST => BASE-URL/:id/directors should return", async() => {
    const director = {
        firstName: "Antonie",
        lastName: "Fuqca",
        nationality: "American",
        image: "https://en.wikipedia.org/wiki/Antoine_Fuqua#/media/File:Antoine_Fuqua_(29682821190).jpg",
        birthday: "1965-05-30"
    } 
    const NewDirectors = await Director.create(director)
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([NewDirectors.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(NewDirectors.id)
    await NewDirectors.destroy()

})

// POST /movies/:id/genres
test("POST => BASE_URL/:id/genres should return", async() => {
    const genre ={
        name: "Action"
    }
    const newGenres = await Genres.create(genre)
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([newGenres.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(newGenres.id)
    expect(res.body[0]).toBeDefined()
    await newGenres.destroy()
})


test("DELETE => BASE_URL should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)
        expect(res.status).toBe(204)
        
})


