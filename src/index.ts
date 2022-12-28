import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";
import categoryRoutes from './routes/categoryRoute'
import userRouters from './routes/userRoutes'
import productsRouters from './routes/productsRouters'
import reviewsRouters from './routes/reviewRouters'
import addressRouters from './routes/addressReuters'
import orderReuters from './routes/orderReuters'
import sellerReuters from './routes/sellerRouter'
import wishlistReuters from './routes/wishlistReutes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './middlewares/passport.middleware'
import { sessionMiddleware } from "./middlewares/session.middleware";
import { Server } from 'socket.io'



dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json({
    verify: (req: any, _res: any, buffer) => req['rawBody'] = buffer
}))
app.use(cookieParser(`${process.env.COOKIE_SECRET}`))
app.use(sessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (_req, res) => {

        res.redirect('http://localhost:3000/succsess');
    }
);



app.use('/api/products', productsRouters)
app.use('/api/categories', categoryRoutes)
app.use('/api/user', userRouters)
app.use('/api/review', reviewsRouters)
app.use('/api/address', addressRouters)
app.use('/api/order', orderReuters)
app.use('/api/seller', sellerReuters)
app.use('/api/wishlist', wishlistReuters)


app.get('/', (_req, res) => {
    res.send('API is running')
})
process.setMaxListeners(0);

let http = app.listen(PORT, () => console.log(`running port on ${PORT}`));

// socket io section
let io = new Server(http, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});
let users: any = [];

const addUser = (userId: string, socketId: string) => {
    !users.some((user: any) => user.userId === userId) && userId &&
        users.push({ userId, socketId })
}
const getUser = (userId: string) => {
    return users.find((user: any) => user.userId == userId)
}
io.on("connection", (socket: any) => {

    socket.on("setup", (userID: string) => {
        addUser(userID, socket.id)
    })
    // @ts-ignore 
    socket.on("sendNotification", ({ productID, message, receiverId, reded1 }) => {
        const receiver = getUser(receiverId)
        console.log({ message, receiverId })
        io.to(receiver?.socketId).emit("getNotification", {
            message,
            productID,
            reded1
        })
    })
    // const newArray = new Set([...users])
    // console.log("a user connected" + socket.id);
    console.log({ users });
});
