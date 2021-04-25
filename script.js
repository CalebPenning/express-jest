const express = require('express')
const path = require('path')
const router = express.Router()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function homepage(req, res) {
        res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/cats', function getCat(req, res) {
    res.send("YOU GOT A KITTY CAT")
})

app.post('/cats', function createCat(req, res) {
    res.send("YOU CREATED A KITTY CAT")
    console.log("nodemon updated the route!")
})

const greetings = {
    en: "Hello",
    fr: "Bonjour", 
    es: "Hola"
}


// When declaring express routes, prefix parameters with a colon
app.get('/greet/:language', function greet(req, res) {
    // you can then get the parameter value by accessing the request object that express creates
    let greeting = greetings[req.params.language]
    if (!greeting) return res.send("Invalid Language.")
    return res.send(greeting.toUpperCase())
})

// request.query will get query strings
app.get('/search', function search(req, res) {
    console.log(req.query)
    return res.send("<h1>HELLO</h1>")
})

app.get('/headers', function showHeaders(req, res) {
    console.log(req.rawHeaders, req.headers)  
    return res.send(req.headers)
})

app.get('/show-language', function showLang(req, res) {
    const lang = req.headers['accept-language']
    return res.send(`Your language preference is: ${lang}`)
})

app.post('/show-body', function getBody(req, res) {
    body = req.body
    return res.send(`Welcome to website, ${req.body['username']}`)
})

// Always put app listener at the end of the file, after your routes and well after the app instance is created.
app.listen(3000, function() {
    console.log("App listening on port 3000")
})