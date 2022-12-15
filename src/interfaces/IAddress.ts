import mongoose from "mongoose";

export interface IAddress {
    user: mongoose.SchemaDefinitionProperty<string>,
    address: string,
    city: string,
    postalCode: string,
    country: string
}