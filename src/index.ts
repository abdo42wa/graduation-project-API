import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";
import categoryRoutes from './routes/category/categoryRoute'
import userRouters from './routes/user/userRoutes'
import productsRouters from './routes/products/productsRouters'
import reviewsRouters from './routes/reviews/reviewRouters'
import shippingAddressRouters from './routes/shippingAddress/shippingAddressReuters'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './middlewares/passport.middleware'
import { sessionMiddleware } from "./middlewares/session.middleware";

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
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
    (req, res) => {

        res.redirect('http://localhost:3000/succsess');
    }
);



app.use('/api/products', productsRouters)
app.use('/api/categories', categoryRoutes)
app.use('/api/user', userRouters)
app.use('/api/review', reviewsRouters)
app.use('/api/shippingAddress', shippingAddressRouters)


app.get('/', (req, res) => {
    res.send('API is running')
})

app.listen(PORT, () => console.log(`running port on ${PORT}`));