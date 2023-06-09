import { User } from '@auth0/auth0-react'
import request from 'superagent'

const rootUrl = '/api/v1/users'

export function getUser(id: number): Promise<User | null> {
  return request
    .get(`${rootUrl}/${id}`)
    .then((res: { body: { user: any } }) => {
      return res.body.user
    })
}

export async function addUser(newUser: User): Promise<number | null> {
  try {
    const response = await request.post(rootUrl).send(newUser)

    return response.body.userId
  } catch (error) {
    console.error('Error while adding a new user: ', error)
    return null
  }
}

export function deleteUser(id: number): Promise<void> {
  return request
    .delete(`${rootUrl}/${id}`)
    .then(() => {
      console.log('User deleted successfully.')
    })
    .catch((error: any) => {
      console.error('Error while deleting user: ', error)
    })
}
