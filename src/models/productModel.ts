import mongoose from "mongoose";
import { IProduct, ModerationStatus, ProductStatus } from "../interfaces/IProduct";



const productSchema = new mongoose.Schema<IProduct>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Seller'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    imageCloud: {
        type: Object,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    moderationStatus: {
        type: String,
        required: true,
        default: ModerationStatus.PENDING,
    },
    status: {
        type: String,
        required: true,
        default: ProductStatus.NEW,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
    },
    rejectedMessage: {
        type: String,
        default: '',
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: true,
    }
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema)

export default Product;