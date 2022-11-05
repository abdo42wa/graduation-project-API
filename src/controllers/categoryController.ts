import asyncHandler from 'express-async-handler'
import Category, { ICategory } from '../models/categoryModel'


const getCategories = asyncHandler(async (req, res) => {

    const category = await Category.find({})

    res.json(category)
})

const getSubCategories = asyncHandler(async (req, res) => {

    const subcategories = await Category.find({ 'parentID': { $ne: null } })

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

const addCategory = asyncHandler(async (req, res) => {
    const { title, status } = req.body;

    const category = await Category.findOne({ title })
    if (category) {
        res.status(400)
        throw new Error('category already exists')
    }

    const createCategory = await Category.create({
        title,
        status,
    })

    if (createCategory) {
        res.status(200).json({
            _id: createCategory._id,
            title: createCategory.title,
            status: createCategory.status
        })
    } else {
        res.status(400)
        throw new Error('invalid category data')
    }
})


const addSubCategory = asyncHandler(async (req, res) => {
    const { title, status } = req.body;
    const category = await Category.findById(req.params.id);
    const categoryName = await Category.findOne({ title })

    const createSubCategory: ICategory = await Category.create({
        title,
        status,
        parentID: req.params.id
    })
    if (category && !categoryName) {


        res.status(201).json({
            _id: createSubCategory._id,
            title: createSubCategory.title,
            status: createSubCategory.status,
            parentId: createSubCategory.parentID

        })
    } else {
        res.status(400)
        throw new Error('this category ID not not exist')


    }
})

const deleteCategory = asyncHandler(async (req, res) => {

    // delete the parent category and the sub categories is exist  
    const category = await Category.findById(req.params.id);

    if (category) {
        await Category.deleteMany({
            $or: [
                {
                    _id: req.params.id
                },
                {
                    parentID: req.params.id
                }
            ]
        })
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }


})

const deleteSubcategory = asyncHandler(async (req, res) => {

    const category = await Category.findById(req.params.id);

    if (category) {
        category.remove();
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }


})

const updateCategory = asyncHandler(async (req, res) => {

    const { title, status } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {

        category.title = title
        category.status = status

        await category.updateOne({
            title,
            status
        })
        res.json(category)
    } else {
        res.status(404);
        throw new Error('Category not found')
    }


})
export { getCategories, getCategoryById, getSubCategories, addCategory, addSubCategory, deleteCategory, deleteSubcategory, updateCategory }