import { users } from "../../models/users";
import connection from "./connection";

const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

export interface User {
  id: number
  username: string
  user_email: string
  
}

export async function GetAllUsers(db = connection) {
  try {
    const tasks = await db('users').select(
      'id',
      'username',
      'user_email'
     
    )
    console.log(tasks)
    return tasks
  } catch (error) {
    console.log(error, (error as Error).message)
  }
}

import { Response } from 'express'

export async function getUser(id: number, res: Response, db = connection) {
  const allUsers = await GetAllUsers(db)
  console.log('allUsers:', allUsers)
  const user = allUsers.find((task: { id: number }) => task.id === id)
  console.log('user', user)
  if (!user) {
    return res.status(404).json({ error: `User with id ${id} not found` })
  }
  return res.json(user)
}



export function addNewUser(newUser: User, db = connection) {
  return db<User>('users')
    .insert(newUser)
    .then((id: Number) => id, [0])
}

export function deleteUser(id: number, db = connection) {
  return db<User>('users').where('id', id).delete()
}

