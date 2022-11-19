import mongoose from "mongoose";

export enum ModerationStatus {
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    PENDING = "PENDING",
    APPROVE = "APPROVE",
}
export enum ProductStatus {
    NEW = 'NEW',
    USED = 'USD',
}

export interface Iproduct {
    user: mongoose.SchemaDefinitionProperty<string>,
    category: mongoose.SchemaDefinitionProperty<string>,
    image: string,
    name: string,
    brand?: string,
    description: string,
    modirationStatus: ModerationStatus,
    numReviews: number,
    price: number,
    status: ProductStatus,
    countInStock: number,
    discaunt: number,
    isPublished: boolean
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
    modirationStatus: {
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
    discaunt: {
        type: Number,
        required: true,
        default: 0,
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