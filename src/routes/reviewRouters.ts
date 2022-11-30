import express from 'express'
import { createProductReview, getAllReviewsWithProductID, getAvaregeRatingByProductId } from '../controllers/reviewController'
import { authenticateUser } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.route('/:id').post(authenticateUser, createProductReview).get(getAllReviewsWithProductID)
router.route('/avr/:id').get(getAvaregeRatingByProductId)


export default router;