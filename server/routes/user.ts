import express, { Request, Response } from 'express'
import checkJwt from '../Auth0'
import * as db from '../db/usersDb'

const router = express.Router()

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

// GET /api/v1/users/:id
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
router.post('/', checkJwt, async (req, res) => {
  try {
    const newUser = req.body
    await db.addNewUser(newUser)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// DELETE /api/v1/users/:id
router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const userId = Number(req.params.id)
    await db.deleteUser(userId)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
