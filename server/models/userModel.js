import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    photo: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    }
})

const User= mongoose.model("User", UserSchema)

export default User 