// Imports (Imporations des modules)
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var Joi = require('joi');

// Instantiate server
var app = express();
app.use(bodyParser.urlencoded({ extended: true })); //récupérer les arguments via la requette http
app.use(bodyParser.json()); //Parser en Json

mongoose.connect('mongodb://localhost/school') //Connection avec la base de donnée
    .then(() => console.log('mongodb is connect...')) //Le retour est de type promise
    .catch((err) => console.log(err.message)) //Sinom une erreur se déclanche

const courseSchema = mongoose.Schema({ //Configuration du schema
    name: String,
    author: String,
    price: Number
})

const Course = mongoose.model('Course', courseSchema) //Model "Entity" qui va construire les donnée sur DB
    // app.use(express.json()) //Converter n'importe quelle requette en format JSON

// Configure routes
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon super serverr</h1>');
    res.send("You Are Connet..")
});

app.get('/api/course', async(req, res) => { //Or async function (req,res) {...}
    const data = await Course.find()
    res.send(data)
})

app.get('/api/course/:id', async(req, res) => { //Or async function (req,res) {...}
    const Id = req.params.id
    const data = await Course.findById(Id)
    res.send(data)
})


app.post('/api/course', async(req, res) => { //Or async function (req,res) {...}


    // // Validation des données
    // const coursValid = {
    //     name: Joi.string().min(3).required(),
    //     author: Joi.string().required(),
    //     price: Joi.number()
    // }
    // const result = Joi.valid(req.body, coursValid)
    // if (result.error) {
    //     return res.status(400).send(result.error.details[0].message)
    //         // }
    // }
    const course = new Course({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price
    })
    const data = await course.save() //Enregister dans DBMongo
    res.send(data)

})

app.delete('/api/course/:id', async(req, res) => { //Or async function (req,res) {...}
    const Id = req.params.id
    const data = await Course.findById(Id)
    const dataDeleted = await data.delete() //Enregister dans DBMongo
    res.send(dataDeleted)
})


app.put('/api/course/:id', async(req, res) => {

    const Id = req.params.id
    const data = await Course.findById(Id)
    data.name = req.body.name,
        data.author = req.body.author,
        data.price = req.body.price
    const dataUpdated = await data.save() //Enregister dans DBMongo
    res.send(dataUpdated)

})



// Launch server
app.listen(8081, function() {
    console.log('Server en écoute :)');
});