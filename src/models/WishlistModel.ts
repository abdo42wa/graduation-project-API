import mongoose from "mongoose";
export interface IWishlist {
    user: mongoose.SchemaDefinitionProperty<string>
    products: [mongoose.SchemaDefinitionProperty<string>];
    name: string
}
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