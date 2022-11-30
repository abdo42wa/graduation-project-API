import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

export enum UserTypes {
    SELLER = 'SELLER',
    BUYER = 'BUYER',
}

export interface IUser {
    _id: string,
    email: string,
    type: UserTypes,
    isAdmin: boolean,
    name: string,
    profile_picture?: string,
    password?: string,
    email_verified: boolean,
    googleID?: string,
    matchPassword: any
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true,
        default: UserTypes.BUYER
    },
    password: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    profile_picture: {
        type: String,
        default: null
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    googleID: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    if (this.password)
        this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User;