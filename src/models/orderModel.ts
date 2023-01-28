import mongoose from "mongoose"
import { IOrder } from "../interfaces/IOrder"


const orderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: { type: String, require: true },
            qty: { type: Number, require: true },
            image: { type: String, require: true },
            price: { type: Number, require: true },
            orderStatus: { type: String, default: "Preparing" },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'Product'
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'User'
            },
        }
    ],
    shippingAddress: {
        address: { type: String, require: true, },
        city: { type: String, require: true },
        postalCode: { type: String, require: true },
        country: { type: String, require: true }
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    paymentResult: {
        id: { type: String, require: true },
        status: { type: String, require: true },
        update_time: { type: String, require: true },
        email_address: { type: String, require: true },
    },
    taxPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        require: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        require: true,
        default: false
    },
    isDelivered: {
        type: Boolean,
        require: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },

}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order