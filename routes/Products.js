const express = require('express')
const router  = express.Router()
const Product = require('../models/Products')
const token   = require('../token')


// Get all routes
router.get('/',token.authenticateToken, async (req,res) => {
	const products = await Product.find()

	res.json(products)
})



/*
router.get('/', async (req,res) => {
	const products = await Product.find()

	res.json(products)
})
*/
// Create new product
router.post('/new',token.authenticateToken, async (req,res) => {

	try{
		const newProduct = new Product(req.body)
		const savedProduct = await newProduct.save()

		res.json(savedProduct)

	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Bad request'})
	}

})

// Get specific product
router.get('/:id',token.authenticateToken, async (req, res) =>{

	try{
		const product = await Product.findById({ _id: req.params.id })

		res.json(product)

	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Id not found'})
	}
})

// Delete a product
router.delete('/:id',token.authenticateToken, async (req, res) => {

	try{
		const result = await Product.findByIdAndDelete({ _id: req.params.id })

		res.json(result)
	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Id not found'})
	}
})

// Update a product
router.patch('/:id',token.authenticateToken, async (req, res) => {

	try{
		const product = await Product.updateOne({_id: req.params.id}, {$set: req.body})

		res.json(product)
	} catch (err) {
		console.log(err)
		throw err
	} finally{
		res.status(400)
		res.json({'error': 'Id not found'})
	}
})

module.exports = router