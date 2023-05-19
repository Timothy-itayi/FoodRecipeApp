import express from 'express'
import { join } from 'node:path'

import user from './routes/user'
import posts from './routes/posts'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/users', user)
server.use('/api/v1/posts', posts)
export default server
