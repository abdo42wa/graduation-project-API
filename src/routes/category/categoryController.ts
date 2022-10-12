import asyncHandler from 'express-async-handler'
import Category, { ISubCategory } from '../../models/categoryModel'


const getCategories = asyncHandler(async (req, res) => {

   
    const category = await Category.find({})

    res.json(category)
})

const getSubCategories = asyncHandler(async (req, res) => {

   
    const categories = await Category.find({'subCategories.title': {$exists:true} })
    const subcategories = categories.map((category) => category.subCategories)

    res.json(subcategories)
})


const getCategoryById = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id)

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({ message: 'Category not found' })
        throw new Error('Category not found')
    }
})

const addCategory = asyncHandler(async (req,res) => {
    const {title,status,subCategories} = req.body;

    const category = await Category.findOne({ title })
    if(category){
        res.status(400)
        throw new Error('category already exists')
    }

    const createCategory = await Category.create({
        title,
        status,
        subCategories
    })

    if(createCategory){
        res.status(200).json({
            _id: createCategory._id,
            title: createCategory.title,
            status:createCategory.status,
            subCategories:createCategory.subCategories
            

        })
    }else {
        res.status(400)
        throw new Error('invalid category data')
    }
})


const addSubCategory = asyncHandler(async (req,res) => {
    const {title,status} = req.body;
    const category = await Category.findById(req.params.id).where('subCategories.title').equals(title)
    if(category){ 
        
        res.status(400)
        throw new Error('invalid category data')
    }else{
        const category1 = await Category.findById(req.params.id)
        const createSubCategory :ISubCategory = {
            title,
            status,
        }
            category1!.subCategories.push(createSubCategory);
    
            await category1!.save()
            res.status(201).json({ message: 'Review added' })
       
    }
})

const deleteCategory = asyncHandler(async (req,res) => {


    const category =  await Category.findById(req.params.id);

    if(category){

        category.remove()
        res.json({ message: 'Category removed' })
    }else{
        res.status(404)
        throw new Error('Category not found')
    }
    

})

const deleteSubcategory = asyncHandler(async (req,res) => {


    const category =  await Category.findById(req.params.id);

    if(category){

        category.remove()
        res.json({ message: 'Category removed' })
    }else{
        res.status(404)
        throw new Error('Category not found')
    }
    

})
export {getCategories,getCategoryById,getSubCategories,addCategory,addSubCategory,deleteCategory, deleteSubcategory}