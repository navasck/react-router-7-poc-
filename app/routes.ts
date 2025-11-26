import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
route("contact", "routes/contact.tsx"),
route("posts", "routes/posts.tsx"),
route("posts/:postId", "routes/postdetail.tsx")
] satisfies RouteConfig;


