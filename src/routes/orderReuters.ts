import express from 'express'
import { addOrderItems, checkout, createOrder, getAllOrders, getAllOrdersByUserId } from '../controllers/orderController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrderItems, authenticated)
router.get('/admin', getAllOrders, authenticated).get('/', getAllOrdersByUserId, authenticated)

router.post('/create-checkout-session', checkout, authenticated)
router.post('/webhook', createOrder);


export default router;