import expressAsyncHandler from "express-async-handler";
import ShippingAddress, { IShippingAddress } from "../models/shippingAddressModel";

export const addOrUpdateAddress = expressAsyncHandler(async (req, res) => {
    const { address, city, country, postalCode }: IShippingAddress = req.body;



    const addAddress = await ShippingAddress.create({
        user: req.user,
        address,
        city,
        country,
        postalCode
    })

    if (addAddress) {
        res.status(200).json({
            addAddress
        })
    } else {
        res.status(400)
        throw new Error('invalid Address data')
    }
})

export const getUserAddress = expressAsyncHandler(async (req, res) => {
    const userAddress = await ShippingAddress.find({ 'user': req.user })

    if (userAddress) {
        res.status(200).json(userAddress[0])
    } else {
        res.status(400)
        throw new Error('This user have not add the address yet')
    }
})