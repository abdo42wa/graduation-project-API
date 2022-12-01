import asyncHandler from 'express-async-handler'
import User from "../models/userModel"
import dotenv from "dotenv"
import passport from '../middlewares/passport.middleware';
import { Request, Response, NextFunction } from 'express'
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
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            email_verified: user.email_verified,
        })
    } else {
        res.status(400)
        throw new Error('inveld user data')
    }
})


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
    passport.authenticate("local", (err, user, info) => {
        if (!user) return res.status(401).json({ message: "Email or password is incorect" })

        req.login(user, (err) => {
            if (err) {
                throw err;
            } else {
                res.status(201).json({
                    user,
                })
            }
        })
    })(req, res, next)
});

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

    res.status(200).json({ allUsers })
})
export { registerUser, authUser, logout, getUserInfo, getAllUsers, updateUserProfile };

