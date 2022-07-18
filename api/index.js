import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js'
import videoRoutes from './routes/videos.js'
import commentRoutes from './routes/comments.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const CONNECTION_URL = process.env.CONNECTION_URL

app.use(express.json({ limit: '30mb' }))
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/videos', videoRoutes)
app.use('/comments', commentRoutes)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
    .catch((error) => console.log(error.message));