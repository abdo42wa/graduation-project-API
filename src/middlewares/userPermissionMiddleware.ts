import { Request, Response, NextFunction } from "express"

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        next();
    } else {
        res.send(401).send("You mast login firest")
    }
}
