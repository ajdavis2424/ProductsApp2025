//Entry point for API requests
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from '../models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json()); //middleware allow us to accept json in req.body

//Products route
app.post('/api/products', async (req, res) => {
  //get product from user (body)
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: 'Please fill in all required fields!' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save(); //-- Save to DB!
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating a new product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  //get id from url
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting a product:', error.message);
  }
});

app.listen(5005, () => {
  connectDB();
  console.log('Server started at http://localhost:5005');
});
