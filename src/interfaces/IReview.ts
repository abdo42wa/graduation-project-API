import mongoose from "mongoose";

export interface IReview {
    _id?: string,
    user?: mongoose.SchemaDefinitionProperty<string>,
    product?: mongoose.SchemaDefinitionProperty<string>,
    rating?: number,
    comment?: string,
}