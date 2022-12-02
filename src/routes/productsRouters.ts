import express from 'express'
import { AdminGetProducts, approveProduct, createProduct, deleteProduct, getAllProductWithTheUserID, getProductById, getProducts, updateProduct } from '../controllers/productController';
import { authenticateUser } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.get('/own', getAllProductWithTheUserID, authenticateUser);
router.get('/', getProducts).get('/:id', getProductById).delete('/:id', deleteProduct);
router.post('/create', createProduct);
router.put('/:id', updateProduct).patch('/approve/:id', approveProduct);
router.get('/admin/products', AdminGetProducts)


export default router;