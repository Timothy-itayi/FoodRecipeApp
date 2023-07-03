import { Response } from 'express'
import connection from './connection'
import { users } from '../../models/users'

const knex = require('knex')
const config = require('./knexfile')
const db = knex(config.development)

interface User {
  id: number
  username: string
  user_email: string
}

export async function GetAllUsers(db = connection) {
  try {
    const users = await db('users').select('id', 'username', 'user_email')
    return users
  } catch (error) {
    console.error(error, (error as Error).message)
  }
}

export async function getUser(
  id: number,
  db = connection
): Promise<User | null> {
  const allUsers: users[] = (await GetAllUsers(db)) || []
  const user = allUsers.find((user: users) => user.id === id)

  if (!user) {
    return null
  }

  const { id: userId, username, user_email } = user
  const userObject = { id: userId, username, user_email }

  return userObject
}

export function addNewUser(newUser: users, db = connection) {
  try {
    db<users>('users')
      .insert(newUser)
      .then((id: number[]) => id[0])
  } catch (error) {
    console.error('Error while adding a new user: ', error)
  }
}

export function deleteUser(id: number, db = connection) {
  try {
    db<users>('users').where('id', id).delete()
  } catch (error) {
    console.error('Erro while deleting user ', error)
  }
}
