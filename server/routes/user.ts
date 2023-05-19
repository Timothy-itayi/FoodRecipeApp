import express from 'express'

const router = express.Router()

import * as db from '../db/usersDb'

router.get('/', async (req, res) => {
  try {
    const users = await db.GetAllUsers()
    // Get all the Users from db

    res.json({ users: users })
    // 'send' the users as a response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const userId = await Number(req.params.id)

    // get the user by id
    const user = db.getUser(userId, res)
    // json response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = req.body
    await db.addNewUser(newUser)
    res.sendStatus(201)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    await db.deleteUser(userId)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
