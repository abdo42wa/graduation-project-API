import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();
export const sendEmail = async (email: string, subject: string, text: string) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transport.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("email sent successfully")
    } catch (error) {
        console.error(error)
    }
}