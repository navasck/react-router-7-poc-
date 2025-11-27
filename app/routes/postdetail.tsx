import { useLoaderData } from "react-router";

export async function loader({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!res.ok) {
    throw new Response("Post not found", { status: res.status });
  }

  const post = await res.json();
  return post;
}

export default function PostDetail() {
  const post = useLoaderData() as { id: number; title: string; body: string };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">{post.title}</h1>
      <p className="text-gray-700 text-lg dark:text-white">{post.body}</p>
    </div>
  );
}
