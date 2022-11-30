import express from 'express'
import { addOrderItems, checkout, createOrder } from '../../controllers/orderController';
import { authenticateUser } from '../../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrderItems, authenticateUser)

router.post('/create-checkout-session', checkout, authenticateUser)
router.post('/webhook', createOrder);


export default router;