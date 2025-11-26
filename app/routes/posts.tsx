import { useLoaderData, Link } from "react-router";


export async function loader() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Response("Failed to fetch posts", { status: res.status });
  }

  const posts = await res.json();
  return posts.slice(0, 10);
}

export default function Posts() {
  const posts = useLoaderData() as { id: number; title: string }[];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Post Listing
      </h2>

      <div className="space-y-3">
        {posts.map((p) => (
          <div
            key={p.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <Link
              to={`/posts/${p.id}`}
              className="text-blue-600 font-medium hover:underline"
            >
              {p.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
