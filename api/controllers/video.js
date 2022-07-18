import createError from '../error.js'
import Video from '../models/Video.js'
import User from '../models/User.js'

export const addVideo = async (req, res, next) => {
    const video = req.body
    const newVideo = new Video({ userId: req.userId, ...video})

    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    } catch (err) {
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, 'Video not found'))

        if(req.userId === video.userId){
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set:req.body
            }, { new: true })
            res.status(200).json(updatedVideo)
        } else {
            return next(createError(403, 'Cannot update others video'))
        }
    } catch (err) {
        next(err)
    }
}

export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return next(createError(404, 'Video not found'))

        if(req.userId === video.userId){
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json('Video has been deleted')
        } else {
            return next(createError(403, 'Cannot delete others video'))
        }
    } catch (err) {
        next(err)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $inc: { views: 1 }
        })
        res.status(200).json('View incremented')
    } catch (err) {
        next(err)
    }
}

export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40}}])
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const trendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const subVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId)
        const { subscribedUsers } = user;

        const list = await Promise.all(
            subscribedUsers.map((channelId) => {
                return Video.find({ userId: channelId })
            })
        )

        res.status(200).json(list.flat())
    } catch (err) {
        next(err)
    }
}

export const getByTag = async (req, res, next) => {
    const tags = req.query.tags?.split(',')
    try {
        const videos = await Video.find({ tags: { $in: tags }}).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const search = async (req, res, next) => {
    const { search } = req.query

    try {
        const videos = await Video.find({ title: { $regex: search, $options: 'i' }})
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}