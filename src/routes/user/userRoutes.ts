import express from 'express'
import { authUser, logout, registerUser, getUserInfo, getAllUsers } from '../../controllers/userController'

const router = express.Router();

router.post('/signup', registerUser).post('/login', authUser);
router.get('/logout', logout)
router.get('/userinfo', getUserInfo).get('/allusers', getAllUsers)

export default router;