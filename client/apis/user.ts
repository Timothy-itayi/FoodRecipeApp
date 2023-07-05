import { User } from '@auth0/auth0-react'
import request from 'superagent'

const rootUrl = '/api/v1/users'

export function getUser(id: number): Promise<User | null> {
  return request.get(`${rootUrl}/${id}`).then((res) => {
    return res.body.user
  })
}

export async function addUser(
  newUser: User,
  authToken: string
): Promise<number | null> {
  try {
    const response = await request
      .post(`${rootUrl}/users`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(newUser)

    return response.body.id
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
    .catch((error) => {
      console.error('Error while deleting user: ', error)
    })
}
