import express from 'express'
import { addOrUpdateAddress, getUserAddress, getUserAddressById } from '../controllers/addressController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrUpdateAddress, authenticated)
router.get('/', getUserAddress)
router.get('/:id', getUserAddressById)


export default router;