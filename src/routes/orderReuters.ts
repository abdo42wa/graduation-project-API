import express from 'express'
import { addOrderItems, checkout, createOrder, getAllOrders, getAllOrdersByUserId, getMonthlyIncome, getSellerOrders, UpdateProductStatus } from '../controllers/orderController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrderItems, authenticated)
router.get('/admin', getAllOrders, authenticated).get('/', getAllOrdersByUserId, authenticated)

router.post('/create-checkout-session', checkout, authenticated)
router.post('/webhook', createOrder);
router.get('/income', getMonthlyIncome);
router.get('/seller', getSellerOrders);
router.post('/seller/:id', UpdateProductStatus);


export default router;