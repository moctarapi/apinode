const express = require('express')
const router  = express.Router()
const User    = require('../models/Users')
const token   = require('../token')
const jwt     = require('jsonwebtoken')

// Get all routes
router.get('/',token.authenticateToken, async (req,res) => {
	const users = await User.find()

	res.json(users)
})

// Get user login
router.get('/login',token.authenticateToken, async (req,res) => {
	const users = await User.find()

	res.json(users)
})

// Create new user
router.post('/new',token.authenticateToken, async (req,res) => {

	try{
		const newUser = new User(req.body)
		const savedUser = await newUser.save()

		res.json(savedUser)

	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Bad request'})
	}

})

// Check if user exist

router.post('/login', function(req, res) {
	User.findOne({username: req.body.username,password: req.body.password}, function(err, user){
		//console.log(req.body.username)
		if(err) {
			console.log(err)
		}
		var message
		if(user) {
			console.log(user)
			message = 'username and password match'
			console.log(message)
			const userToken = {username: req.body.username,password: req.body.password}

			const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET)
			res.json({ accessToken: accessToken })

		} else {
			message= 'username and password doesn\'t match'
        
			res.json({message: message})
		}
        
	})
})

// Delete a user
router.delete('/:id',token.authenticateToken, async (req, res) => {

	try{
		const result = await User.findByIdAndDelete({ _id: req.params.id })

		res.json(result)
	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Id not found'})
	}
})

// Update a user
router.patch('/:id',token.authenticateToken, async (req, res) => {

	try{
		const user = await User.updateOne({_id: req.params.id}, {$set: req.body})

		res.json(user)
	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Id not found'})
	}
})

module.exports = router