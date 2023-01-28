import expressAsyncHandler from "express-async-handler";
import { IAddress } from "../interfaces/IAddress";
import Address from "../models/addressModel";

export const addOrUpdateAddress = expressAsyncHandler(async (req, res) => {
    const { address, city, country, postalCode }: IAddress = req.body;



    const addAddress = await Address.create({
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
    const userAddress = await Address.find({ 'user': req.user })

    if (userAddress) {
        res.status(200).json(userAddress[0])
    } else {
        res.status(400)
        throw new Error('This user have not add the address yet')
    }
})

export const getUserAddressById = expressAsyncHandler(async (req, res) => {
    const userAddress = await Address.find({ 'user': req.params.id })

    if (userAddress) {
        res.status(200).json(userAddress[0])
    } else {
        res.status(400)
        throw new Error('Please try agin later ')
    }
})