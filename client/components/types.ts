export interface Post {
  id: number
  title: string
  description: string
  user_id: number | null
  image_url: string | null
}

export interface User {
  id: number
  username: string
  user_email: string
}
export interface CustomUser {
  id: number
  username: string
  user_email: string
  selectedIcon: string
}
