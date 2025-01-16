//Entry point for API requests
import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; //Built in node module
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

const __dirname = path.resolve(); //

app.use(express.json()); //middleware allow us to accept json in req.body

/* 1 route for products (/api/products). When user hits /api/products we call productRoutes(produc.route.js), 
then we check which method (GET/POST/PUT/DELETE) is needed, the related function is inside the controller folder */
app.use('/api/products', productRoutes); //-- Everything in product.routes is now prefixed with /api/products

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
