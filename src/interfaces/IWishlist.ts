import mongoose from "mongoose";
export interface IWishlist {
    user: mongoose.SchemaDefinitionProperty<string>
    products: [mongoose.SchemaDefinitionProperty<string>];
    name: string
}