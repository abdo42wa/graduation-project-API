import express from 'express'
import {
    AdminGetProducts, applyDiscount, approveProduct, changeVisibility, createProduct,
    deleteProduct, getAllProductWithTheUserID, getProductById, getProducts, updateProduct
} from '../controllers/productController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.get('/own', getAllProductWithTheUserID, authenticated);
router.get('/', getProducts).get('/:id', getProductById).delete('/:id', deleteProduct);
router.post('/create', createProduct);
router.put('/:id', updateProduct, authenticated).patch('/approve/:id', approveProduct).patch('/discount/:id', applyDiscount);
router.patch('/visibility/:id', changeVisibility);
router.get('/admin/products', AdminGetProducts)


export default router;