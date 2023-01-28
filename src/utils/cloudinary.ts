import dotenv from "dotenv"
dotenv.config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dxa6e3wbc",
    api_Key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

export default cloudinary;