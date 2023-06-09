import express, { Request, Response } from 'express'
import { expressjwt as expressJwt, GetVerificationKey } from 'express-jwt'
import jwks from 'jwks-rsa'
import * as db from '../db/usersDb'
import { JwtPayload } from 'jsonwebtoken'

const router = express.Router()
const jwt = require('jsonwebtoken')
const domain = 'https://dev-kuvlvwpp7p78xckw.au.auth0.com'
const audience = 'https://recipe/api'

// Set up token verification middleware
const checkJwt = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${domain}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: audience,
  issuer: `${domain}/`,
  algorithms: ['RS256'],
})

interface User {
  id: number
  username: string
  user_email: string
}

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.GetAllUsers()
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// GET users by id /api/v1/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id)
    const user: User | null = await db.getUser(userId)
    if (!user) {
      return res.status(404).json({ error: `User with id ${userId} not found` })
    }
    const { id, username, user_email } = user
    const userObject = { id, username, user_email }
    res.json({ user: userObject })
  } catch (error) {
    console.error('Error while retrieving user:', error)
    res.status(500).json({ error: 'Error while retrieving user' })
  }
})

// POST /api/v1/users
router.post('/', async (req: Request<{}, {}, User>, res: Response) => {
  try {
    const newUser = req.body
    const userId = await db.addNewUser(newUser)
    res.status(201).json({ userId })
  } catch (error) {
    console.log('Error adding user:', error)
    res.status(500).json({ error: (error as Error).message })
  }
})

// DELETE /api/v1/users/:id
router.delete(
  '/:id',
  checkJwt,
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = Number(req.params.id)
      await db.deleteUser(userId)
      res.sendStatus(200)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
)

export default router
