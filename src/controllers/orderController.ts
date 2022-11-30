import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/orderModel';
import dotenv from "dotenv"
import { Response } from 'express'
import { NextFunction } from 'express-serve-static-core';
const stripe = new Stripe(`${process.env.SECRET_KEY}`, {
    apiVersion: '2022-11-15'
});

dotenv.config();
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

export const createOrder = (req: any, res: Response, next: NextFunction) => {

    let event;
    // This is your Stripe CLI webhook secret for testing your endpoint locally.

    const sig = req.headers['stripe-signature'];
    // make sure the signature come from stripe 
    try {
        event = stripe.webhooks.constructEvent(req['rawBody'], sig!, `${process.env.WEB_HOOK_SECRET}`);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err}`);
    }
    console.log(event.type)
    if (event.type === 'checkout.session.completed') {

        res.send(event.data.object);
    }
};


export const addOrderItems = asyncHandler(async (req, res, next) => {
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