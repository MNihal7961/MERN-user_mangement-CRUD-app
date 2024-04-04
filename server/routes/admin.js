import express from 'express'
import {getAllUsers} from '../controllers/adminController.js'
import { editProfile } from '../controllers/userController.js'

const router=express.Router()

router.get('/allusers',getAllUsers)
router.put('/edituser/:id',editProfile)

export default router