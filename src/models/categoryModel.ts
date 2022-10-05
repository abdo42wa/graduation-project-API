import mongoose from "mongoose";

enum CategoryStatus {
    PENDING = 'PENDING',
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    APPROVED = 'APPROVED',
}

interface ICategory {
    title: string,
    status: CategoryStatus,
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
    }
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category;