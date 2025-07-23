
"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";

interface PostInterface {
  id: number;
  title: string;
  body: string;
  userId : number;
}

export default function Post({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = use(params);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<PostInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const dataApi = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!dataApi.ok) {
          throw new Error(`Error al obtener el post: ${dataApi.status}`);
        }

        const data = await dataApi.json();
        setPost(data);
      } catch (error) {
        console.error("Error cargando", error);
        setError("Error al cargar el post");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  if (loading) {
    return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-black text-center font-sans text-2xl animate-pulse">Cargando post</h1>
      </div>
    </div>
  )
  }

  if (error) {
    return <h1 className="text-red-600">{error}</h1>;
  }

  if (!post) {
    return(
      <Image src={"/under-construction-1550234_1280.jpg"}
      alt="Construccion"
      ></Image>
      
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-700 mb-4">Autor del post: {post.userId}</p>
        <p className="text-lg text-gray-800">{post.body}</p>
      </div>
    </div>
  );
}