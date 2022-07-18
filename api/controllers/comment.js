import Comment from "../models/Comment.js"
import Video from '../models/Video.js';
import createError from '../error.js'

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ userId: req.userId, ...req.body})
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(comment.videoId)

        if(req.userId === comment.userId || req.userId === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment deleted")
        } else {
            return next(createError(403, 'You can delete only your comment'))
        }
    } catch (err) {
        next(err)
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).send(comments)
    } catch (err) {
        next(err)
    }
}