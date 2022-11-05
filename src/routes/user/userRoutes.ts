import express from 'express'
import { authUser, logout, registerUser, getUserInfo } from '../../controllers/userController'

const router = express.Router();

router.post('/signup', registerUser).post('/login', authUser);
router.get('/logout', logout)
router.get('/userinfo', getUserInfo);
export default router;