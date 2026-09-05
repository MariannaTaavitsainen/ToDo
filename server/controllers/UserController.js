import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../models/User.js'

const { sign } = jwt

const getCredentials = (req) => {
  const email = req.body.user?.email?.trim().toLowerCase()
  const password = req.body.user?.password
  return { email, password }
}
const validateCredentials = (email, password) => {
  if (!email || !password) {
    const error = new Error('Email and password are required')
    error.status = 400
    throw error
  }
}

const signUp = async (req, res, next) => {
  try {
    const { email, password } = getCredentials(req)
    validateCredentials(email, password)
    const hashedPassword = await hash(password, 10)
    const result = await createUser(email, hashedPassword)

    return res.status(201).json(result.rows[0])
  } catch (error) {
    return next(error)
  }
}

const signIn = async (req, res, next) => {
  try {
    const { email, password } = getCredentials(req)
    validateCredentials(email, password)
    const result = await findUserByEmail(email)
    const dbUser = result.rows[0]

    if (!dbUser || !(await compare(password, dbUser.password))) {
      const error = new Error('Invalid email or password')
      error.status = 401
      return next(error)
    }
    const token = sign(
      { userId: dbUser.id, email: dbUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h',},
    )
    return res.status(200).json({ id: dbUser.id, email: dbUser.email, token,})
  } catch (error) {
    return next(error)
  }
}

export { signUp, signIn }