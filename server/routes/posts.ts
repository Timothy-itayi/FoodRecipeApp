import express from 'express'
const router = express.Router()

import * as db from '../db/postsDb'

router.get('/', async (req, res) => {
  try {
    console.log('Executing GET /posts')
    const posts = await db.getAllPosts()
    console.log('Retrieved posts:', posts)
    res.json({ posts: posts })
  } catch (error) {
    console.error('Error in GET /posts:', error)
    res.status(500).json({ error: (error as Error).message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    console.log('Executing GET /posts/:id')
    const postId = Number(req.params.id)
    console.log('Requested post ID:', postId)
    const post = await db.getPost(postId, res)
    console.log('Retrieved post:', post)
    res.json(post)
  } catch (error) {
    console.error('Error in GET /posts/:id:', error)
    res.status(500).json({ error: (error as Error).message })
  }
})

router.post('/', async (req, res) => {
  try {
    console.log('Executing POST /posts')
    const newPost = req.body
    console.log('New post data:', newPost)
    await db.addNewPost(newPost)
    res.sendStatus(201)
  } catch (error) {
    console.error('Error in POST /posts:', error)
    res.status(500).json({ error: (error as Error).message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    console.log('Executing DELETE /posts/:id')
    const postId = Number(req.params.id)
    console.log('Post ID to delete:', postId)
    await db.deletePost(postId)
    res.sendStatus(200)
  } catch (error) {
    console.error('Error in DELETE /posts/:id:', error)
    res.status(500).json({ error: (error as Error).message })
  }
})

export default router
