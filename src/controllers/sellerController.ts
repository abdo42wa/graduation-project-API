import asyncHandler from "express-async-handler";
import { ISeller } from "../interfaces/ISeller";
import { UserTypes } from "../interfaces/IUser";
import Seller from "../models/sellerModel";
import User from "../models/userModel";

export const addSeller = asyncHandler(async (req, res) => {
    const { image, phoneNumber }: ISeller = req.body;

    const addSeller = await Seller.create({
        user: req.user,
        image,
        phoneNumber
    })

    if (addSeller) {
        res.status(200).json({
            addSeller
        })

        const user = await User.findById(req.user)

        if (user) {
            user.type = UserTypes.SELLER
        }
        await user?.save()
    } else {
        res.status(400)
        throw new Error('invalid data')
    }
})

export const getSeller = asyncHandler(async (req, res) => {
    const seller = await Seller.find({ 'user': req.user })
        .populate({ path: 'user', select: ['name'] })

    if (seller) {
        res.status(200).json(seller[0])
    } else {
        res.status(400)
        throw new Error('This user have not add the address yet')
    }
})