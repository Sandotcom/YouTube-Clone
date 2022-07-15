import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const CONNECTION_URL = process.env.CONNECTION_URL

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
    .catch((error) => console.log(error.message));