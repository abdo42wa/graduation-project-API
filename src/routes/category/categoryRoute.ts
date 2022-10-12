import express from 'express'
import { addCategory, addSubCategory, deleteCategory, getCategories, getCategoryById, getSubCategories } from './categoryController';

const router = express.Router();


router.route('/sub').get(getSubCategories).post(addSubCategory)
router.route('/sub/:id').post(addSubCategory)
router.route('/').get(getCategories).post(addCategory);

router.route('/:id').get(getCategoryById).delete(deleteCategory)

export default router;