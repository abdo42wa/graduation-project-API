import mongoose from "mongoose";

export interface IShippingAddress {
    user: mongoose.SchemaDefinitionProperty<string>,
    address: string,
    city: string,
    postalCode: string,
    country: string
}

const shippingAddressSchema = new mongoose.Schema<IShippingAddress>({
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

const ShippingAddress = mongoose.model('Shipping', shippingAddressSchema)

export default ShippingAddress