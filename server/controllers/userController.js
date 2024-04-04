import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//GET PROFILE DATA FROM DB
export const fetchData = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized token" })
        }

        const verified = jwt.verify(token, "crudappmern")

        if (!verified) {
            return res.status(401).json({ success: false, message: "Unauthorized token" })
        }

        const data = await User.findById(verified.user)
        if (!data) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error, please try again" })
    }
}

//EDIT USER PROFILE
export const editProfile = async (req, res) => {
    try {
        const { name, photo } = req.body

        const update = await User.findByIdAndUpdate(req.params.id, { name: name, photo: photo })

        const user=await User.findById(req.params.id)

        if (update) {
            res.status(200).json({ success: true, message: "user updation success" ,user:user})
        } else {
            res.status(400).json({ success: false, message: "something went wrong while updating profile" })
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//CHANGE PASSWORD
export const resetPassword = async (req, res) => {


    try {

        const { oldPassword, newPassword } = req.body


        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            return res.status(403).json({ success: false, message: "Invalid Credentials" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newPassword, salt)

        const update = await user.updateOne({ password: hashPassword })

        if (!update) {
            return res.status(500).json({ success: false, message: "Error occured while updating" })
        }

        res.status(200).json({ success: true, message: "Success fully changed password" })
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

//DELETE ACCOUNT
export const deleteAccount = async (req, res) => {
    console.log('start')
    try {
        const id = req.params.id

        console.log(req.params.id, 'id')

        const update = await User.findByIdAndDelete(id)
        if (update) {
            res.status(200).clearCookie("token").json({ succcess: true, message: 'Delete Suceess' })
        } else {
            res.status(404).json({ succcess: false, message: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ succcess: false, message: 'Server Error' })
    }
}
