import express from 'express';

import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateExistingProduct,
} from '../controller/product.controller.js';

const router = express.Router();

/*GET Call Controller folder contains functions*/
router.get('/', getAllProducts);

/*POST Call */
router.post('/', createNewProduct);

/*PUT Call */
router.put('/:id', updateExistingProduct);

/*DELETE Call */
router.delete('/:id', deleteProduct);

export default router;
