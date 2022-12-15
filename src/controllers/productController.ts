import asyncHandler from 'express-async-handler'
import { IProduct, ModerationStatus } from '../interfaces/IProduct'
import Product from '../models/productModel'

const getProducts = asyncHandler(async (req, res) => {

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const products = await Product.find({ ...keyword, 'moderationStatus': "APPROVE", 'isPublished': true })

    res.json(products)
})

const AdminGetProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({ 'moderationStatus': { $ne: "APPROVE" } })
        .populate({ path: 'category', select: ['title'] })

    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)
        .populate({ path: 'user', select: ['name'] })
        .populate({ path: 'category', select: ['title'] })

    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })
        throw new Error('product not found')
    }
})
const deleteProduct = asyncHandler(async (req, res) => {
    if (req.isAuthenticated()) {
        const product = await Product.findById(req.params.id)

        if (product) {
            await product.remove()
            res.json({ message: 'Product removed' })
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    } else {
        res.status(401)
        throw new Error('Please log in')
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, image, brand, category, countInStock, discount, description, status }: IProduct = req.body;

    const product = await Product.create({
        user: req.user,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        discount,
        status,
    })

    res.status(201).json(product)

})
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        status,
        discount

    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name ?? product.name
        product.price = price ?? product.price
        product.description = description ?? product.description
        product.image = image ?? product.image
        product.brand = brand ?? product.brand
        product.category = category ?? product.category
        product.countInStock = countInStock ?? product.countInStock
        product.status = status ?? product.status
        product.discount = discount ?? product.discount

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

const getAllProductWithTheUserID = asyncHandler(async (req, res) => {
    const products = await Product.find({ 'user': req.user })
    if (products) {

        res.json(products)
    } else {
        res.status(400)
        throw new Error('user is not exist')
    }

})

const approveProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        let moderationStatus = product.moderationStatus = ModerationStatus.APPROVE
        await product.updateOne({
            moderationStatus
        })
        res.send(product);
    } else {
        res.status(400)
        throw new Error('user is not exist')
    }

})

const applyDiscount = asyncHandler(async (req, res) => {
    const { discount } = req.body;
    const product = await Product.findById(req.params.id)
    if (product) {
        product.discount = discount
        await product.updateOne({
            discount
        })
        res.send(product);
    } else {
        res.status(400)
        throw new Error('user is not exist')
    }
})

const changeVisibility = asyncHandler(async (req, res) => {
    const { isPublished } = req.body;
    const product = await Product.findById(req.params.id)
    if (product) {
        product.isPublished = isPublished
        await product.updateOne({
            isPublished
        })
        res.send(product);
    } else {
        res.status(400)
        throw new Error('user is not exist')
    }
})

export { getProducts, changeVisibility, applyDiscount, getProductById, deleteProduct, createProduct, updateProduct, getAllProductWithTheUserID, AdminGetProducts, approveProduct }