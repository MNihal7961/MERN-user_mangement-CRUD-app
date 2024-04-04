import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'

//REGISTER
export const register = async (req, res) => {
    const { email, password, name, gender, photo, role } = req.body
    try {
        //CHECK EXIST USER
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).json({ success: false, message: "User already exist with this email" })
        }

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            name,
            password: hashPassword,
            gender,
            photo,
            role
        })

        await newUser.save()

        res
            .status(200)
            .json({ succcess: true, message: "User Successfully Registered", user: newUser })

    } catch (err) {

        res.status(400).json({ succcess: false, message: "Server Failed Tryagain" })
    }
}

//LOGIN
export const login = async (req, res) => {
    console.log('called')

    const { email, password } = req.body

    try {

        //CHECK EXIST USER
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        console.log('valid user')

        // COMPARE PASSWORD
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(403).json({ succcess: false, message: "Invalid Credentials" })
        }

        console.log('paass match')

        const token = jwt.sign(
            {
                user: user._id,
            },
            "crudappmern", {
            expiresIn: "30d"
        }
        )

        if (token) {
            console.log('token created')
        }

        res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            })
            .json({ success: true, message: 'Login Success' ,user})

    } catch (err) {
        res.status(400).json({ succcess: false, message: "Server Failed Tryagain" })
    }
}

//LOGOUT
export const logout = (req, res) => {
    try {
        res.status(200).clearCookie("token").json({ succcess: true, message: 'Logout Suceess' })
    } catch (err) {
        res.status(400).json({ succcess: false, message: "Bad Request" })
    }

}