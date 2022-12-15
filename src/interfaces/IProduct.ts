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

export interface IProduct {
    user: mongoose.SchemaDefinitionProperty<string>,
    category: mongoose.SchemaDefinitionProperty<string>,
    image: string,
    name: string,
    brand?: string,
    description: string,
    moderationStatus: ModerationStatus,
    numReviews: number,
    price: number,
    status: ProductStatus,
    countInStock: number,
    discount: number,
    isPublished: boolean
}