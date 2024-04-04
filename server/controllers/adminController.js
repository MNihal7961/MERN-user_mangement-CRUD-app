import User from "../models/userModel.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" })
        return res.status(200).json({ success: true, message: "Data Fetched", users })
    } catch (err) {
        return res.status(500).json({ success: false })
    }
}

export const adminEditProfile = async (req, res) => {
    try {
        const id = req.params.id
        const { name, photo } = req.body

        const update = await User.findByIdAndUpdate(id, { name: name, photo: photo })

        if (update) {
            res.status(200).json({ success: true, message: "user updation success" })
        } else {
            res.status(400).json({ success: false, message: "something went wrong while updating profile" })
        }
    } catch (err) {
        return res.status(500).json({ success: false })
    }
}