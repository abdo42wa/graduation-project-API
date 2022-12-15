import mongoose from "mongoose";
import { IWishlist } from "../interfaces/IWishlist";

const wishlistSchema = new mongoose.Schema<IWishlist>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            require: true,
            ref: 'Product'
        },
        name: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist;