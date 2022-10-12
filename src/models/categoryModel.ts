import mongoose from "mongoose";

enum CategoryStatus {
    PENDING = 'PENDING',
    IN_CLARIFICATION = 'IN_CLARIFICATION',
    APPROVED = 'APPROVED',
}

interface ICategory {
    title: string,
    status: CategoryStatus,
    subCategories: { title: string, status: CategoryStatus }[]  
}

export interface ISubCategory {
    title: string,
    status: CategoryStatus
}

const subCategorySchema = new mongoose.Schema <ISubCategory>({
        title:{type: String},
        status:{type: String, default: CategoryStatus.PENDING}
});

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
    subCategories:[subCategorySchema]
},{
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category;