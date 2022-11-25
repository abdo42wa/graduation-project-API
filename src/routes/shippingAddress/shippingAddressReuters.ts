import express from 'express'
import { addOrUpdateAddress, getUserAddress } from '../../controllers/shippingAddressController';
import { authenticateUser } from '../../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrUpdateAddress, authenticateUser).get('/', getUserAddress, authenticateUser)


export default router;