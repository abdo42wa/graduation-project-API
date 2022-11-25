import session from "express-session"
import MongoStore from 'connect-mongo'
import { Request, Response, NextFunction } from 'express'
import dotenv from "dotenv"
export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    dotenv.config();
    return session({
        secret: `${process.env.COOKIE_SECRET}`,
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }
        )
    })(req, res, next)
}