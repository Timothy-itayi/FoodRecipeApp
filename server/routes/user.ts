import express from 'express'
import checkJwt from '../Auth0'

const router = express.Router()

import * as db from '../db/usersDb'

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.GetAllUsers()
    res.json({ users })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

// GET /api/v1/users/:id
router.get('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const user = await db.getUser(userId, res)
    res.json({ user })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
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
