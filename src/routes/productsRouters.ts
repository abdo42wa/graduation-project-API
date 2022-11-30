import express from 'express'
import { createProduct, deleteProduct, getAllProductWithTheUserID, getProductById, getProducts, updateProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getProducts).get('/:id', getProductById).delete('/:id', deleteProduct)
router.post('/create', createProduct)
router.put('/:id', updateProduct).get('/one/:id', getAllProductWithTheUserID);


export default router;