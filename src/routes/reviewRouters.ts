import express from 'express'
import { createProductReview, deleteReview, getAllReviews, getAllReviewsWithProductID, getAverageRatingByProductId, getReviewsStats } from '../controllers/reviewController'
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();
router.get('/stats', getReviewsStats)
router.get('/all', getAllReviews)
router.route('/:id').post(authenticated, createProductReview).get(getAllReviewsWithProductID)
router.route('/avr/:id').get(getAverageRatingByProductId)
router.route('/delete/:id').delete(deleteReview)


export default router;