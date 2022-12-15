import mongoose from "mongoose";
import { ISeller } from "../interfaces/ISeller";


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