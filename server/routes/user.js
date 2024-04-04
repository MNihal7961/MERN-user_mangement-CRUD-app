import express from 'express'
import { fetchData, editProfile, resetPassword, deleteAccount } from '../controllers/userController.js'

const router = express.Router()

router.get('/fetchdata', fetchData)
router.put('/editprofile/:id', editProfile)
router.put('/resetpassword/:id', resetPassword)
router.delete('/deleteaccount/:id', deleteAccount)

export default router