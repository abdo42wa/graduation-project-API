import express from 'express'
import { createProductReview, getAllReviewsWithProductID, getAverageRatingByProductId } from '../controllers/reviewController'
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.route('/:id').post(authenticated, createProductReview).get(getAllReviewsWithProductID)
router.route('/avr/:id').get(getAverageRatingByProductId)


export default router;