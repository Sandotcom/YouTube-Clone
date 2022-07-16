import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// Update user
router.put('/:id', verifyToken, updateUser)

// Delete user
router.delete('/:id', verifyToken, deleteUser)

// Get user
router.get('/find/:id', getUser)

// Subscribe user
router.put('/sub/:id', verifyToken, subscribe)

// Unsubscribe user
router.put('/unsub/:id', verifyToken, unsubscribe)

// Like video
router.put('/like/:videoId', verifyToken, like)

// Dislike video
router.put('/dislike/:videoId', verifyToken, dislike)


export default router;