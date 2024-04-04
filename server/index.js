import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import adminRoute from './routes/admin.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 4000

//MIDDLEWARES
app.use(express.json())
app.use(cookieParser())

//CORS
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

//ROUTES
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/admin', adminRoute)

//DATABASE CONNECTION
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongoDB connected')
    } catch (error) {
        console.log('Error while connectin DB', error.message)
    }
}

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error starting the server:', error);
    } else {
        connectDB()
        console.log(`Server running at http://localhost:${PORT}`);
    }
})