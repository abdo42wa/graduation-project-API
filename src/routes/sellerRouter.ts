import express from 'express'
import { addSeller, getSeller } from '../controllers/sellerController';
import { authenticateUser } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addSeller, authenticateUser)
router.get('/', getSeller)


export default router;