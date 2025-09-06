
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@cluster0.cciqerw.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0';

const createProdeuct = async (req, res, next) => {
    console.log(req.body);
    const product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };

    const client = new MongoClient(url);
    try {
      await client.connect();
        const database = client.db();
        const products = database.collection('products');
        console.log(product);
        const result = await products.insertOne(product);
        client.close();
        return res.status(201).json({ message: 'Product created', productId: result.insertedId });
    } catch (error) {
        console.error('Error creating product:', error);
        client.close();
        return res.status(500).json({ message: 'Creating product failed' });
    }
};
const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);

    try {
  await client.connect();
  const database = client.db();
  const products = database.collection('products');
  const prods = await products.find().toArray();
  client.close();
  return res.status(200).json({ products: prods });
} catch (error) {
  console.error('Error fetching products:', error);
  client.close();
  return res.status(500).json({ message: 'Fetching products failed' });
};
}

module.exports = { createProdeuct, getProducts }