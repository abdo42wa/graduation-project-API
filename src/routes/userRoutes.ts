import express from 'express'
import { authUser, logout, registerUser, getUserInfo, getAllUsers, updateUserProfile, verifyUserEmail } from '../controllers/userController'
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/signup', registerUser).post('/login', authUser);
router.get('/logout', logout)
router.get('/userinfo', getUserInfo).get('/allusers', getAllUsers);
router.put('/profile', authenticated, updateUserProfile)
router.get('/:id/verify/:token', verifyUserEmail)

export default router;