import mongoose from "mongoose";

export interface IAddress {
    user: mongoose.SchemaDefinitionProperty<string>,
    address: string,
    city: string,
    postalCode: string,
    country: string
}

const addressSchema = new mongoose.Schema<IAddress>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    postalCode: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }

})

const Address = mongoose.model('Address', addressSchema)

export default Address