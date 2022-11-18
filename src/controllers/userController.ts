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
            email_veryfied: user.email_veryfied,
        })
    } else {
        res.status(400)
        throw new Error('inveld user data')
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

const getUserInfo = (req: Request, res: Response, next: NextFunction) => {

    req.isAuthenticated() ?
        res.status(200).json(req.user)
        : res.status(401).json({ user: null })
}

const logout = ((req: Request, res: Response, next: NextFunction) => {
    // req.logOut((err) => {
    //     return next(err)
    // });

    req.session.destroy((err) => {
        res.clearCookie("connect.sid")
        res.status(204).send("user looged out")
    });
})

const getAllUsers = (async (req: Request, res: Response, next: NextFunction) => {

    const allUsers = await User.find({})

    res.status(200).json({ allUsers })
})
export { registerUser, authUser, logout, getUserInfo, getAllUsers };

