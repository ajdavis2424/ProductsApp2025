import mongoose from 'mongoose';

const productSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //WIll give me createdAt, updatedAt fields
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
