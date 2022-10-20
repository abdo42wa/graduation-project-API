import mongoose from "mongoose";

enum CategoryStatus {
    PENDING = 'PENDING',
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    APPROVED = 'APPROVED',
}

export interface ICategory {
    _id?:string,
    title: string,
    status: CategoryStatus,
    parentID?: string
}

const categorySchema = new mongoose.Schema <ICategory>({
    title: {
        type: String,
        unique:true,
        require: true,
    },
    status:{
        type:String,
        require: true,
        default: CategoryStatus.PENDING
    },
    parentID:{
        type:String,
        default: null,
    },
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category;