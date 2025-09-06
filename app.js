const express = require('express');
const bodyParser = require('body-parser');
const { createProdeuct, getProducts } = require('./mongo');
const { createProdeuctMongoose, getProductsMongoose } = require('./mongoose');


const app = express();

app.use(bodyParser.json());

app.post('/products', createProdeuctMongoose);

app.get('/products', getProductsMongoose);

app.listen(3000);