import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel"
import { ObjectId } from 'bson';
import Review from "../models/reviewsModel"
import { IReview } from "../interfaces/IReview";

const createProductReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment }: IReview = req.body

    const newReview = await Review.create({
        rating,
        comment,
        product: req.params.id,
        user: req.user
    });

    if (newReview) {
        res.status(201).json({ message: 'Review added successfully' })
    } else {
        res.status(400)
        throw new Error('Please enter a valid review')
    }
})

const getAllReviewsWithProductID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    const reviews = await Review.find({ 'product': product })
        .populate({ path: 'user', select: ['name'] })
    if (product) {

        res.json(reviews)
    } else {
        res.status(400)
        throw new Error('user is not exist')
    }
})

const getAverageRatingByProductId = asyncHandler(async (req, res) => {

    const average: any = [
        {
            '$match': {
                'product': {
                    '$eq': new ObjectId(req.params.id)
                }
            }
        }, {
            '$group': {
                '_id': '1',
                'avgRating': {
                    '$avg': '$rating'
                }
            }
        }
    ]

    const reviews = await Review.aggregate(average)
    const rating = reviews.map((x) => x.avgRating)
    res.json(rating)
})

const getReviewsStats = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    console.log({ lastYear })
    const data = await Review.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ])

    res.status(200).json(data.sort((a, b) => a._id + b._id));
})

const getAllReviews = asyncHandler(async (req, res, next) => {

    const review = await Review.find({}).populate({ path: 'user', select: ['name'] })
    res.status(200).json(review);
})

const deleteReview = asyncHandler(async (req, res, next) => {

    const review = await Review.findById(req.params.id)

    if (review) {
        await review.remove()
        res.json({ message: 'Review removed' })
    } else {
        res.status(404)
        throw new Error('Review not found')
    }


})

export { createProductReview, getAllReviewsWithProductID, getAverageRatingByProductId, getReviewsStats, getAllReviews, deleteReview }