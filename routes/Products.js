const express = require('express')
const router = express.Router()
const Product=require('../models/Products')

// Get all routes
router.get('/', async (req,res) => {
    const products = await Product.find()

    res.json(products)
})

// Create new product
router.post('/new', async (req,res) => {

    try{
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()

        res.json(savedProduct);

    } catch (err) {
        console.log(err)
        throw err
    }

})

// Get specific product
router.get('/:id', async (req, res) =>{

    try{
        const product = await Product.findById({ _id: req.params.id })

        res.json(product)

    } catch (err) {
        console.log(err)
        throw err
    }
})

// Delete a product
router.delete('/:id', async (req, res) => {

    try{
        const result = await Product.findByIdAndDelete({ _id: req.params.id })

        res.json(result)
    } catch (err) {
        console.log(err)
        throw err
    }
})

// Update a product
router.patch('/:id', async (req, res) => {

    try{
    const product = await Product.updateOne({_id: req.params.id}, {$set: req.body})

    res.json(product)
    } catch (err) {
        console.log(err)
        throw err
    }
})

module.exports = router