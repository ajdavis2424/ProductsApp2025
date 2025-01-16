import mongoose from 'mongoose';
import Product from '../../models/product.model.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Empty{} means get all
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('Error retrieving products');
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createNewProduct = async (req, res) => {
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
};

export const updateExistingProduct = async (req, res) => {
  //Get id from url
  const { id } = req.params;
  const product = req.body; //name/image/price fields

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
    console.error('Error updating the product:', error.message);
  }
};

export const deleteProduct = async (req, res) => {
  //get id from url
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
    console.error('Error deleting a product:', error.message);
  }
};
