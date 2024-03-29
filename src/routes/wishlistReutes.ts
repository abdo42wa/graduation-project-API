import express from 'express'
import { addProductToWishlist, getUserWishlist, getUserWishlistByProductID, removeProductFromWishlist } from '../controllers/wishlistController';
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/:id', addProductToWishlist).get('/:id', getUserWishlistByProductID)
router.post('/remove/:id', removeProductFromWishlist)
router.get('/', getUserWishlist, authenticated)


export default router;