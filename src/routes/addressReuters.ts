import express from 'express'
import { addOrUpdateAddress, getUserAddress } from '../controllers/addressController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addOrUpdateAddress, authenticated)
router.get('/', getUserAddress)


export default router;