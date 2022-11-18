import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import Product from "../models/productModel"
import { ObjectId } from 'bson';
import Review, { IReview } from "../models/reviewsModel"

const createProductReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment }: IReview = req.body

    const newReview = await Review.create({
        rating,
        comment,
        product: req.params.id,
        user: req.user
    });

    if (newReview) {
        res.status(201).json({ message: 'Review added succsessfuly' })
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

const getAvaregeRatingByProductId = asyncHandler(async (req, res) => {

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


export { createProductReview, getAllReviewsWithProductID, getAvaregeRatingByProductId }