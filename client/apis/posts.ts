import request from 'superagent'
import { Post } from '../components/types'

const rootUrl = '/api/v1/posts'

export function getAllPosts(): Promise<Post[]> {
  return request.get(rootUrl).then((res) => {
    const data = res.body
    // Check the value of data

    if (data && Array.isArray(data.posts)) {
      // Transform data.posts into an array of objects
      const posts = data.posts.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        user_id: item.user_id,
        image_url: item.image_url,
      }))
      console.log('Is data an array?', Array.isArray(data))
      return posts
    } else {
      // Handle invalid response format
      throw new Error('Invalid response format')
    }
  })
}

export function getPost(id: number): Promise<any> {
  return request.get(`${rootUrl}/${id}`).then((res) => {
    return res.body.post
  })
}

export function addNewPost(newPost: any): Promise<number> {
  const { title, description, image_url } = newPost
  const postData = {
    title,
    description,
    image_url,
  }

  return request
    .post(rootUrl)
    .send(postData)
    .then((res) => {
      console.log(res.body) // Log the response body
      return newPost
    })
}

export function updatePost(id: number, updatedPost: any): Promise<void> {
  const { title, description, image_url } = updatedPost
  const postData = {
    title,
    description,
    image_url,
  }

  return request
    .put(`${rootUrl}/${id}`)
    .send(postData)
    .then(() => {})
}

export function deletePost(id: number): Promise<void> {
  return request.delete(`${rootUrl}/${id}`).then(() => {})
}
