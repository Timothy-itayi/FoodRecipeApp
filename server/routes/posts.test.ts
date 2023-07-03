import request from 'supertest'
import express from 'express'
import postRouter from './posts'

const app = express()
app.use(express.json())
app.use('/api/v1/posts', postRouter)

// Mock the authentication middleware
jest.mock('../Auth0', () => (req: any, res: any, next: () => any) => next())

test('GET /api/v1/posts should return a list of posts', async () => {
  const response = await request(app).get('/api/v1/posts')
  console.log('Response status:', response.status)
  console.log('Response body:', response.body)
  // Updated code

  expect(response.status).toBe(200)
  expect(response.body).toBeDefined() // Check if the response body exists
  // Check if posts array is not empty
  // Add more assertions as needed
})

test('GET /api/v1/posts/:id should return a post', async () => {
  const response = await request(app).get('/api/v1/posts/2') // Assuming post ID 1 exists
  expect(response.status).toBe(200)
  expect(response.body).toBeDefined()
  expect(response.body).toHaveProperty('id')
  expect(response.body).toHaveProperty('title')
  expect(response.body).toHaveProperty('description')
  expect(response.body).toHaveProperty('user_id')
  expect(response.body).toHaveProperty('image_url')
  // Add more assertions as needed
})

test('POST /api/v1/posts should create a new post', async () => {
  const newPost = {
    id: 100,
    title: 'New Post',
    description: 'Lorem ipsum dolor sit amet',
    user_id: 1,
    image_url: 'https://example.com/image.jpg',
    // Provide necessary post data for the test
  }

  const response = await request(app).post('/api/v1/posts').send(newPost)

  expect(response.status).toBe(201)
  // Add more assertions as needed
})

test('DELETE /api/v1/posts/:id should delete a post', async () => {
  const response = await request(app).delete('/api/v1/posts/1') // Assuming post ID 1 exists
  expect(response.status).toBe(200)
  // Add more assertions as needed
})
