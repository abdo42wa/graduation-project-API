import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

enum UserTypes {
    SEELR = 'SELLER',
    BUYER = 'BUYER',
}

export interface Iuser {
    _id: string,
    email: string,
    type: UserTypes,
    isAdmin: boolean,
    name: string,
    bankAaccount?: string,
    password?: string,
    email_veryfied: boolean,
    googleID?: string,
    matchPassword: any
}

const userSchema = new mongoose.Schema<Iuser>({
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
    bankAaccount: {
        type: String,
        default: null
    },
    email_veryfied: {
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