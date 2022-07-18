import express from 'express';
import { signUp, signIn } from '../controllers/auth.js'

const router = express.Router();

// Create User
router.post('/signup', signUp)

// Sign In
router.post('/signin', signIn)

// Google auth
router.post('/google',)

export default router;