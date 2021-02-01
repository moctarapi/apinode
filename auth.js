require('dotenv').config()

const express    = require('express')
const mongoose   = require('mongoose')
const bodyParser = require('body-parser')
const token      = require('./token')
const cors       = require('cors')

// Create express app
const app = express()

// Database mongodb
mongoose.connect('mongodb://localhost:27017', {
	useNewUrlParser:true,
	useUnifiedTopology:true
})

const db = mongoose.connection

db.once('open', () => {
	console.log('Connected to MongoDB')
})

// Middleware
app.use(bodyParser.json())
// CORS-enabled for all origins
app.use(cors())

// Routes
app.get('/',token.authenticateToken, (req, res) => {
	res.redirect('/users/login')
})

const UsersRoute = require('./routes/Users')
app.use('/users', UsersRoute)
const ProductsRoute = require('./routes/Products')
app.use('/products', ProductsRoute)

// Start server
app.listen(3000, console.log('Listening on port 3000'))