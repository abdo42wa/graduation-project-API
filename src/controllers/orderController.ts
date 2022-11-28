import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/orderModel';
const stripe = new Stripe(`${process.env.SECRET_KEY}`, {
    apiVersion: '2022-11-15'
});

export const addOrderItems = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)

    }
})

export const checkout = asyncHandler(async (req, res) => {
    const line_items = req.body.data.cart.map((item: any) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                    description: item.description,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }

    })

    const session = await stripe.checkout.sessions.create({


        line_items,
        mode: 'payment',
        customer_email: req.body.email,
        cancel_url: 'http://localhost:3000/cancel/checkout',
        success_url: 'http://localhost:3000/success/checkout'
    })
    res.send({ url: session.url });

})
