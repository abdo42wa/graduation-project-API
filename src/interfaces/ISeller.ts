import mongoose from "mongoose";


export interface ISeller {
    user: mongoose.SchemaDefinitionProperty<string>,
    image: string,
    phoneNumber: string
}