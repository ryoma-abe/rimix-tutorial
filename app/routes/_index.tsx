import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data: Post[] = await response.json();
  return json({ posts: data });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-3xl">投稿一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
