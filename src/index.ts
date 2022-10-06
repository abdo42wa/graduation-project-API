import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";
import categoryRoutes from './routes/category/categoryRoute'


dotenv.config();
connectDB();
const PORT = process.env.PORT || 500
const app = express();

app.get('/', (req,res) => {
    res.send('API is running')
})

app.use('/api/categories', categoryRoutes )

app.listen(PORT, () => console.log(`running port on ${PORT}`));