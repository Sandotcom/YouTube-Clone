import express from 'express';
import { addComment, deleteComment, getComment } from '../controllers/comment.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addComment)
router.delete('/:id', auth, deleteComment)
router.get('/:videoId', getComment)

export default router;