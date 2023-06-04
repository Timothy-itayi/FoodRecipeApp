import connection from './connection'
import { Response } from 'express'
const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

export interface Post {
  id: number
  title: string
  description: string
  user_id: number
  image_url: string
}

export async function getAllPosts(db = connection) {
  try {
    const posts = await db('posts').select(
      'id',
      'title',
      'description',
      'user_id',
      'image_url'
    )
    console.log(posts)
    return posts
  } catch (error) {
    console.log(error, (error as Error).message)
  }
}

export async function getPost(id: number, res: Response, db = connection) {
  const allPosts: any[] = (await getAllPosts(db)) || []
  console.log('allPosts:', allPosts)
  const post = allPosts.find((p: { id: number }) => p.id === id)
  console.log('post', post)
  if (!post) {
    return res.status(404).json({ error: `Post with id ${id} not found` })
  }
  return res.json(post)
}

export function addNewPost(newPost: Post, db = connection) {
  return db<Post>('posts')
    .insert({
      title: newPost.title,
      description: newPost.description,
      user_id: newPost.user_id,
      image_url: newPost.image_url,
    })
    .then((id: number[]) => id[0])
}

export function updatePost(
  id: number,
  updatedPost: Partial<Post>,
  db = connection
) {
  return db<Post>('posts').where('id', id).update(updatedPost)
}

export function deletePost(id: number, db = connection) {
  return db<Post>('posts').where('id', id).delete()
}

export default {
  getAllPosts,
  getPost,
  addNewPost,
  updatePost,
  deletePost,
}
