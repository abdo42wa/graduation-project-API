import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Order from '../models/orderModel';
import dotenv from "dotenv"
import { Response } from 'express'
import { NextFunction } from 'express-serve-static-core';
import { ObjectId } from 'bson';
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
        success_url: 'http://localhost:3000/success/checkout',
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

export const getAllOrdersByUserId = asyncHandler(async (req, res, next) => {

    const orders = await Order.find({ 'user': req.user })
    if (orders) {
        //@ts-ignore
        res.json(orders.sort((a, b) => a.createdAt + b.createdAt))
    } else {
        res.status(400)
        throw new Error('You have no orders yet')
    }

})

export const getAllOrders = asyncHandler(async (req, res, next) => {

    const orders = await Order.find({})
        .populate({ path: 'user', select: ['name'] })
    if (orders) {

        res.json(orders)
    } else {
        res.status(400)
        throw new Error('there is no orders')
    }

})

export const getMonthlyIncome = asyncHandler(async (req, res, next) => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    console.log(lastMonth, previousMonth);
    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {

                month: { $month: "$createdAt" },
                sales: "$totalPrice"
            },

        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ]);

    if (income) {
        res.status(200).json(income.sort((a, b) => a._id + b._id));
    } else {
        res.status(404).send("theres no data to show")
    }

})


export const UpdateProductStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    // const order = await Order.find({ 'orderItems._id': '636fb4d1314393dc217c4823', 'orderItems.user': req.user })


    const order = await Order.update({ 'orderItems._id': req.params.id, 'orderItems.user': req.user },
        {
            $set:
                { "orderItems.$.orderStatus": status }
        }

    );

    res.status(200).json(order)
})


export const getSellerOrders = asyncHandler(async (req: any, res, next) => {
    // const orders = await Order.find({ 'orderItems.user': req.user })
    try {


        const sellerOrders: any = [
            {
                '$match': {
                    'orderItems.user': new ObjectId(req.user)
                }
            }, {
                '$replaceWith': {
                    '$arrayElemAt': [
                        {
                            '$filter': {
                                'input': '$orderItems',
                                'cond': {
                                    '$eq': [
                                        '$$this.user', new ObjectId(req.user)
                                    ]
                                }
                            }
                        },
                        0
                    ]
                }
            }
        ]
        const result = await Order.aggregate(sellerOrders)
        const mx = await Order.populate(result, { path: 'user', select: ['email'] })
        res.status(200).json(mx)

    } catch (error) {
        res.status(400)
        throw new Error('You have no orders yet')
    }

})