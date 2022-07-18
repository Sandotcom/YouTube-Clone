import express from 'express';
import { addVideo, deleteVideo, getVideo, updateVideo, addView, trendVideos, randomVideo, subVideos, getByTag, search } from '../controllers/video.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addVideo)
router.put('/:id', auth, updateVideo)
router.post('/:id', auth, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/random', randomVideo)
router.get('/trend', trendVideos)
router.get('/sub', auth, subVideos)
router.get('/', getByTag)
router.get('/search', search)

export default router;