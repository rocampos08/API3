'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await res.json()
        await new Promise((resolve) => setTimeout(resolve, 1500)) // solo para simular carga
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-800">Cargando posts...</p>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-3xl mx-auto font-sans">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Posts</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded-md shadow-sm border">
            <h2 className="text-lg font-semibold text-blue-900">{post.title}</h2>
            <p className="text-sm text-gray-700 mb-2">{post.body}</p>
            <p className="text-xs text-gray-500 mb-2">Autor: {post.userId}</p>
            <Link href={`/posts/${post.id}`}>
              <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                Leer más →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
