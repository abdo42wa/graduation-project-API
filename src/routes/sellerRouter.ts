import express from 'express'
import { addSeller, getSeller } from '../controllers/sellerController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/', addSeller, authenticated)
router.get('/', getSeller)


export default router;