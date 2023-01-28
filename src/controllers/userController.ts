import asyncHandler from 'express-async-handler'
import User from "../models/userModel"
import dotenv from "dotenv"
import passport from '../middlewares/passport.middleware';
import { Request, Response, NextFunction } from 'express'
import Token from '../models/tokenModel';
import crypto from 'crypto'
import { sendEmail } from '../utils/sendEmail';
dotenv.config();

const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex')
        }).save();
        const url = `http://localhost:3000/succsess/user/${user._id}/verify/${token.token}`

        await sendEmail(user.email, 'Verify Email', url)
        res.status(200).send({ message: "please verify your email" })
    } else {
        res.status(400)
        throw new Error('inveld user data')
    }
})

export const sendEmail1 = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const url = `http://localhost:3000/succsess/user/verify`;

    await sendEmail("abdo.ahmed.aa754@gmail.com", 'Verify Email', url)
    res.status(200).send({ message: "please verify your email" })
})

const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {

    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(400).send({ message: "Invalid link" })
    const token = await Token.findOne({
        userId: user._id,
        token: req.params.token
    })
    if (!token) return res.status(400).send({ message: "Invalid link" })
    await user.updateOne({ email_verified: true })

    await Token.remove();
    res.status(200).send({ message: "User have been verified successfully" })
}

const updateUserProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const user = await User.findById(req.user)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.profile_picture = req.body.profile_picture || user.profile_picture
        if (req.body.password) {
            const isvalid = await user.matchPassword(req.body.password)
            if (isvalid) {

                user.password = req.body.password
            } else {
                res.status(404)
                throw new Error('Password Dose not match')
            }
        }

        const updatedUser = await user.save()

        res.json({
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            profile_picture: updatedUser.profile_picture
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const authUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err, user, info) => {
        if (!user) return res.status(400).send({ message: "Incorrect email or password" })
        if (!user?.email_verified) {
            let token = await Token.findOne({ userId: user?._id })
            if (!token) {
                token = await new Token({
                    userId: user?._id,
                    token: crypto.randomBytes(32).toString('hex')
                }).save();
                const url = `http://localhost:3000/succsess/user/${user?._id}/verify/${token.token}`

                await sendEmail(user?.email!, 'Verify Email', url)
            }
            return res.status(400).send({ message: "An email sent to your account please verify" })
        } else {
            req.login(user, (err) => {
                if (err) {
                    throw err;
                } else {
                    res.status(201).json({
                        user,
                    })
                }
            })
        }

    })(req, res, next)
});

export const getUserStats = asyncHandler(async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    console.log({ lastYear })
    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ])

    res.status(200).json(data.sort());
})

const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        const user = await User.findById(req.user)

        res.status(200).json(user)
    } else {

        res.status(401).json({ user: null })
    }
}

const logout = ((req: Request, res: Response, next: NextFunction) => {
    // req.logOut((err) => {
    req.session.destroy((err) => {
        res.clearCookie("connect.sid")
        res.status(204).send("user logged out")
    });
    // return next(err)
    // });

})

const getAllUsers = (async (req: Request, res: Response, next: NextFunction) => {

    const allUsers = await User.find({})

    res.status(200).json(allUsers)
})

export { registerUser, authUser, logout, getUserInfo, getAllUsers, updateUserProfile, verifyUserEmail };

