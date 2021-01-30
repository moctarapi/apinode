const express = require('express')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

// Create express app
const app = express()

// Database mongodb
mongoose.connect('mongodb://localhost:27017', {
	useNewUrlParser:true,
	useUnifieldTopology:true
})

const db = mongoose.connection

db.once('open', () => {
	console.log('Connected to MongoDB')
})

// Middleware
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) =>{
	res.send('Welcome in my api')
})

const ProductsRoute = require('./routes/Products')

app.use('/products', ProductsRoute)

// Start server
app.listen(3000, console.log('Listening on port 3000'))