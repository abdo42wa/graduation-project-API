import mongoose from "mongoose";

export enum ProductStatus {
    NEW = 'NEW',
    USED = 'USD',
    PUBLISHED = "PUBLISHED",
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}

export interface Iproduct {
    user: mongoose.SchemaDefinitionProperty<string>,
    category: mongoose.SchemaDefinitionProperty<string>,
    image: string,
    name: string,
    brand?: string,
    description: string,
    rating: number,
    numReviews: number,
    price: number,
    status: ProductStatus,
    countInStock: number,
    discaunt: number,
}

const productSchema = new mongoose.Schema<Iproduct>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
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
    discaunt: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
})


const Product = mongoose.model('Product', productSchema)

export default Product;