import express from "express"
//import { productRoutes } from "./routes/product/productRouts";
console.log("Hello world")

const PORT = 5_000
const app = express();

app.get('/', (req,res) => {
    res.send('API is running')
})

//app.use("/api/products", productRoutes)
app.listen(PORT, () => console.log(`running port on ${PORT}`));