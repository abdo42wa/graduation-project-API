import session from "express-session"
import MongoStore from 'connect-mongo'
import { Request, Response, NextFunction } from 'express'
export const sesstionMiddelware = (req: Request, res: Response, next: NextFunction) => {
    return session({
        secret: "secret is secret",
        resave: false,
        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }
        )
    })(req, res, next)
}