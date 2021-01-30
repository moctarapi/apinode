const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	name : String,
	type : String,
	price : Number,
	rating : Number,
	warranty_years : Number,
	available : Boolean
})

module.exports = mongoose.model('Product', ProductSchema)