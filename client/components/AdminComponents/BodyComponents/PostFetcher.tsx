import React, { useEffect, useState } from 'react'
import { Post } from '../../types'

interface PostFetcherProps {
  setPostsData: React.Dispatch<React.SetStateAction<Post[]>>
}

const PostFetcher: React.FC<PostFetcherProps> = ({ setPostsData }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...')
      try {
        const response = await fetch(`/api/v1/posts?cacheBuster=${Date.now()}`)
        console.log('Response:', response)

        const data = await response.json()
        console.log('Fetched Data:', data) // Check the fetched data

        setPostsData(data.posts) // Update the postsData state with data.posts
        setLoading(false)
      } catch (error) {
        setError('Error fetching data')
        setLoading(false)
        console.error(error)
      }
    }

    fetchData()
  }, [setPostsData])

  console.log('loading:', loading)
  console.log('error:', error)

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  return null
}

export default PostFetcher
