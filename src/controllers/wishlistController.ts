import { ObjectId } from "bson"
import asyncHandler from "express-async-handler"
import Wishlist from "../models/WishlistModel"

export const getUserWishlist = asyncHandler(async (req, res) => {
    const user = await Wishlist.find({ 'user': req.user })
    if (user.length !== 0) {
        const products = await Wishlist.find({ 'products': { $ne: null } })

        res.send(products.map((y) => y.products));
    } else {
        res.send("You have no Item");
    }
})

export const getUserWishlistByProductID = asyncHandler(async (req, res) => {
    const average: any = [
        {
            '$match': {
                'products': {
                    '$eq': new ObjectId(req.params.id)
                },
                'name': {
                    '$eq': req.user
                }
            }
        }
    ]

    const reviews = await Wishlist.aggregate(average)

    res.json(reviews)
})



export const addProductToWishlist = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const user = await Wishlist.find({ 'user': req.user })
    if (user.length === 0) {
        const addProduct = await Wishlist.create({
            products: req.params.id,
            user: req.user,
            name
        })
        res.send(addProduct);

    } else {
        const wishlist = await Wishlist.findOneAndUpdate({ 'name': req.user }, { $push: { products: req.params.id } })

        res.send(wishlist)
    }


})

export const removeProductFromWishlist = asyncHandler(async (req, res) => {
    const WishlistUser = await Wishlist.find({ 'user': req.user })
    if (WishlistUser) {
        const wishlist = await Wishlist.findOneAndUpdate({ 'name': req.user }, { $pull: { products: req.params.id } })

        res.send(wishlist)
    } else {
        res.send("You have no Item");
    }
})




