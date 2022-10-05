import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db";


dotenv.config();
connectDB();
const PORT = process.env.PORT || 500
const app = express();

app.get('/', (req,res) => {
    res.send('API is running')
})

app.listen(PORT, () => console.log(`running port on ${PORT}`));