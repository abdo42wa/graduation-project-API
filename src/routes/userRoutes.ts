import express from 'express'
import { authUser, logout, registerUser, getUserInfo, getAllUsers, updateUserProfile, verifyUserEmail, sendEmail1, getUserStats } from '../controllers/userController'
import { authenticated } from '../middlewares/userPermissionMiddleware';

const router = express.Router();

router.post('/signup', registerUser).post('/login', authUser);
router.get('/logout', logout)
router.get('/userinfo', getUserInfo).get('/allusers', getAllUsers);
router.put('/profile', authenticated, updateUserProfile)
router.get('/:id/verify/:token', verifyUserEmail)
router.get('/send', sendEmail1)
router.get('/stats', getUserStats)

export default router;