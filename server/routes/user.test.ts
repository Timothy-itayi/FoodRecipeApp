import request from 'supertest'
import express from 'express'
import userRouter from './user'

const app = express()
app.use(express.json())
app.use('/api/v1/users', userRouter)

// Mock the authentication middleware
jest.mock('../Auth0', () => (req: any, res: any, next: () => any) => next())

test('GET /api/v1/users should return a list of users', async () => {
  const response = await request(app).get('/api/v1/users')
  console.log('Response status:', response.status)
  console.log('Response body:', response.body)
  // Updated code

  expect(response.status).toBe(200)
  expect(response.body).toBeDefined() // Check if the response body exists
  // Check if users array is not empty
  // Add more assertions as needed
})

test('GET /api/v1/users/:id should return a user', async () => {
  const response = await request(app).get('/api/v1/users/1') // Assuming user ID 1 exists
  expect(response.status).toBe(200)
  expect(response.body).toBeDefined()
  expect(response.body.user).toHaveProperty('id')
  expect(response.body.user).toHaveProperty('username')
  expect(response.body.user).toHaveProperty('user_email')
  // Add more assertions as needed
})

test('POST /api/v1/users should create a new user', async () => {
  const newUser = {
    id: 101,
    username: 'John Adams',
    user_email: 'user@example.com',
    // Provide necessary user data for the test
  }

  const response = await request(app).post('/api/v1/users').send(newUser)

  expect(response.status).toBe(201)
  // Add more assertions as needed
})

test('DELETE /api/v1/users/:id should delete a user', async () => {
  const response = await request(app).delete('/api/v1/users/1') // Assuming user ID 1 exists
  expect(response.status).toBe(200)
  // Add more assertions as needed
})
