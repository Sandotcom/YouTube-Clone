import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../error.js';
import User from '../models/User.js';

export const signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return next(createError(400, 'User already exists'))

        if(password !== confirmPassword) return next(createError(400, "Passwords don't match"))
        
        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create( { name, email, password: hashedPassword })

        const token = jwt.sign( { email: result.email, id: result._id }, process.env.JWT, { expiresIn: '1h' })

        res.status(200).json( { result, token })
    } catch (err) {
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne( { email })

        if(!user) return next(createError(404, 'User not found'))

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) return next(createError(400, 'Invalid credentials'))

        const token = jwt.sign( { email: user.email, id: user._id }, process.env.JWT, { expiresIn: '1h' })

        res.status(200).json( { result: user, token })
    } catch (err) {
        next(err)
    }
}
