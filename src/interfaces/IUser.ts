export enum UserTypes {
    SELLER = 'SELLER',
    BUYER = 'BUYER',
}

export interface IUser {
    _id?: string,
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