import mongoose from "mongoose";

export interface IReview {
    _id?: string,
    user?: mongoose.SchemaDefinitionProperty<string>,
    product?: mongoose.SchemaDefinitionProperty<string>,
    rating?: number,
    comment?: string,
}

const reviewSchema = new mongoose.Schema<IReview>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const Review = mongoose.model('Reviews', reviewSchema)

export default Review;