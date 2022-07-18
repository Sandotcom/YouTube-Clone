import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from '../controllers/user.js'
import auth from '../middleware/auth.js';

const router = express.Router();

// Update user
router.put('/:id', auth, updateUser)

// Delete user
router.delete('/:id', auth, deleteUser)

// Get user
router.get('/find/:id', getUser)

// Subscribe user
router.put('/sub/:id', auth, subscribe)

// Unsubscribe user
router.put('/unsub/:id', auth, unsubscribe)

// Like video
router.put('/like/:videoId', auth, like)

// Dislike video
router.put('/dislike/:videoId', auth, dislike)


export default router;