import express from 'express'
import { addOrUpdateAddress, getUserAddress } from '../../controllers/addressController';
import { authenticateUser } from '../../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrUpdateAddress, authenticateUser)
router.get('/', getUserAddress)


export default router;