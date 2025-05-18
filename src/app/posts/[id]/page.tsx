import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PostInterface {
  id: number;
  title: string;
  body: string;
}

async function getPost(id: string): Promise<PostInterface> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    throw new Error("Error al obtener el post");
  }

  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Post #{post.id}</h1>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="title">Título</TabsTrigger>
          <TabsTrigger value="description">Descripción</TabsTrigger>
        </TabsList>
        <TabsContent value="title">{post.title}</TabsContent>
        <TabsContent value="description">{post.body}</TabsContent>
      </Tabs>
    </main>
  );
}


export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts: PostInterface[] = await res.json();

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
