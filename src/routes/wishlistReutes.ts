import express from 'express'
import { addProductToWishlist, getUserWishlist, getUserWishlistByProductID, removeProductFromWishlist } from '../controllers/wishlistController';
import { authenticateUser } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/:id', addProductToWishlist).get('/:id', getUserWishlistByProductID)
router.post('/remove/:id', removeProductFromWishlist)
router.get('/', getUserWishlist, authenticateUser)


export default router;