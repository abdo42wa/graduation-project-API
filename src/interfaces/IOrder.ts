import mongoose from "mongoose"
export interface IOrder {
    user: mongoose.SchemaDefinitionProperty<string>,
    orderItems: [],
    shippingAddress: {},
    paymentMethod: string,
    paymentResult: {},
    shippingPrice: number,
    totalPrice: number,
    taxPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    deliveredAt: Date

}