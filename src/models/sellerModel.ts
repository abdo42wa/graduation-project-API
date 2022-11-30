import mongoose from "mongoose";


export interface ISeller {
    user: mongoose.SchemaDefinitionProperty<string>,
    image: string,
    phoneNumber: string
}

const sellerSchema = new mongoose.Schema<ISeller>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    image: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
})


const Seller = mongoose.model('Seller', sellerSchema)

export default Seller;