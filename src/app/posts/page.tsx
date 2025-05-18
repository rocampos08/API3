"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react"
import 'react-circular-progressbar/dist/styles.css';


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
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await res.json()
        await new Promise((resolve) => setTimeout(resolve, 1500)); 
        setPosts(data)

        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin p-4 rounded-full h-20 w-20 border-t-4 border-blue-500 mb-4"></div>
        <h1 className="text-black text-center font-sans text-2xl animate-pulse">Cargando posts...</h1>
      </div>
    </div>
  )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 font-sans">
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center text-black font-bold mb-6">WebPosts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {posts.map((post) => (
          
            <Card className="w-full hover:shadow-xl transition rounded-4xl m-2 p-5 border-gray-400 border">
              <CardHeader className="flex gap-3">
                <Image
                  alt="heroui logo"
                  height={40}
                  src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                  width={40}
                />
                <div className="flex flex-col">
                  <p className="text-md text-blue-950 font-semibold">{post.title}</p>
                  <p className="text-sm text-gray-800 text-default-500">Autor :{post.userId} </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-sm text-gray-700">{post.body}</p>
              </CardBody>
              <Divider />
              <Link key={post.id} href={`/posts/${post.id}`} >
              <CardFooter>
                <button className="text-sm bg-blue-500 block mx-auto cursor-pointer p-1  m-1 rounded-md hover:bg-blue-950">Leer más →</button>
              </CardFooter>
              </Link>
            </Card>
          
        ))}
      </div>
    </div>
    </div>
  )
}
