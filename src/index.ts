import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";
import categoryRoutes from './routes/category/categoryRoute'
import cors from 'cors'

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running')
})

app.use('/api/categories', categoryRoutes )

app.listen(PORT, () => console.log(`running port on ${PORT}`));