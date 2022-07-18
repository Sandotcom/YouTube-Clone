import createError from '../error.js'
import User from '../models/User.js'
import Video from '../models/Video.js'

export const updateUser = async (req, res, next) => {
    let { id } = req.params

    if(id === req.userId){
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {
                $set:req.body
            },
            { new: true }
            )

            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, 'Cannot update another account'))
    }
}

export const deleteUser = async (req, res, next) => {
    let { id } = req.params

    if(id === req.userId){
        try {
            await User.findByIdAndDelete(id)

            res.status(200).json('User deleted')
        } catch (err) {
            next(err)
        }
    } else {
        return next(createError(403, 'Cannot delete another account'))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}

export const subscribe = async (req, res, next) => {
    let { id } = req.params

    try {
        await User.findByIdAndUpdate(req.userId, {
            $push: { subscribedUsers: id }
        })
        await User.findByIdAndUpdate(id, {
            $inc: { subscribers : 1}
        })
        res.status(200).json('Subscription successfull')
    } catch (err) {
        next(err)
    }
}

export const unsubscribe = async (req, res, next) => {
    let { id } = req.params
    try {
        await User.findByIdAndUpdate(req.userId, {
            $pull: { subscribedUsers: id }
        })
        await User.findByIdAndUpdate(id, {
            $inc: { subscribers: -1}
        })
        res.status(200).json('Unsubscription successfull')
    } catch (err) {
        next(err)
    }
}

export const like = async (req, res, next) => {
    const userId = req.userId
    const { videoId } = req.params

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: userId },
            $pull: { dislikes: userId}
        })
        res.status(200).json("Video has been liked")
    } catch (err) {
        next(err)
    }
}

export const dislike = async (req, res, next) => {
    const userId = req.userId
    const { videoId } = req.params
    
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: userId },
            $pull: { likes: userId }
        })
        res.status(200).json("Video has been disliked")
    } catch (err) {
        next(err)
    }
}