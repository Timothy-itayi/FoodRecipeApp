import connection from './connection'
import { users } from '../../models/users'
import { Response } from 'express'

const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

interface User {
  id: number
  username: string
  user_email: string
}

export async function GetAllUsers(db = connection): Promise<User[]> {
  try {
    const users = await db('users').select('id', 'username', 'user_email')
    return users
  } catch (error) {
    console.error(error, (error as Error).message)
    throw error
  }
}

export async function getUser(
  id: number,
  db = connection
): Promise<User | null> {
  try {
    const allUsers: users[] = await GetAllUsers(db)
    const user = allUsers.find((user: users) => user.id === id)

    if (!user) {
      return null
    }

    const { id: userId, username, user_email } = user
    const userObject = { id: userId, username, user_email }

    return userObject
  } catch (error) {
    console.error('Error while retrieving user:', error)
    throw error
  }
}
export function addNewUser(newUser: User, db = connection): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      db<users>('users')
        .insert(newUser)
        .then((ids: number[]) => resolve(ids[0]))
        .catch((error: Error) => reject(error))
    } catch (error) {
      reject(error)
    }
  })
}

export function deleteUser(id: number, db = connection) {
  try {
    db<users>('users').where('id', id).delete()
  } catch (error) {
    console.error('Error while deleting user', error)
    throw error
  }
}
