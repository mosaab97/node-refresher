const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb+srv://admin:admin@cluster0.cciqerw.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Connection to MongoDB failed', err);
    });


const createProdeuctMongoose = async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });
    try {
        const result = await product.save();
        return res.status(201).json({ message: 'Product created', result });
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ message: 'Creating product failed' });
    }
};

const getProductsMongoose = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Fetching products failed' });
    }
};

module.exports = { createProdeuctMongoose, getProductsMongoose }