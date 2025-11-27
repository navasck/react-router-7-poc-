import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Kawasaki POC" },
    { name: "description", content: "Welcome to Kawasaki POC!" },
  ]
}



export default function Home() {
  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto place-self-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/contact"
          className="block bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-2 text-black">Contact Form</h3>
          <p className="text-gray-600">Submit a message (server-side submit)</p>
        </Link>

        <Link
          to="/posts"
          className="block bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-2 text-black">Post Listing</h3>
          <p className="text-gray-600">View all posts</p>
        </Link>
      </div>
    </div>
  )
}


