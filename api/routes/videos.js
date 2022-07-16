import express from 'express';
import { addVideo, deleteVideo, getVideo, updateVideo, addView, trendVideos, randomVideo, subVideos } from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.post('/:id', verifyToken, deleteVideo)
router.get('/find/:id', getVideo)
router.put('/view/:id', addView)
router.get('/random', randomVideo)
router.get('/tren', trendVideos)
router.get('/sub', verifyToken, subVideos)

export default router;