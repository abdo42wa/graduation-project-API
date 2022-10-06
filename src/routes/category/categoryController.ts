import asyncHandler from 'express-async-handler'
import Category from '../../models/categoryModel'


const getCategories = asyncHandler(async (req, res) => {

   
    const products = await Category.find({})

    res.json(products)
})


const getCategoryById = asyncHandler(async (req, res) => {

    const product = await Category.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Category not found' })
        throw new Error('Category not found')
    }
})

export {getCategories,getCategoryById}