import express from 'express'
import {
    AdminGetProducts, applyDiscount, approveProduct, changeVisibility, createProduct,
    deleteProduct, getAllProducts, getAllProductWithTheUserID, getProductById, getProducts, getProductStats, rejectProduct, sentTOApproveProduct, updateProduct
} from '../controllers/productController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();
router.get('/stats', getProductStats)
router.get('/all', getAllProducts)
router.get('/own', getAllProductWithTheUserID, authenticated);
router.get('/', getProducts).get('/:id', getProductById).delete('/:id', deleteProduct);
router.post('/create', createProduct);
router.put('/:id', updateProduct, authenticated).patch('/approve/:id', approveProduct).patch('/discount/:id', applyDiscount).patch('/reject/:id', rejectProduct);
router.patch('/visibility/:id', changeVisibility);
router.get('/admin/products', AdminGetProducts)
router.get('/all', getAllProducts)
router.patch('/resend/approve/:id', sentTOApproveProduct)


export default router;