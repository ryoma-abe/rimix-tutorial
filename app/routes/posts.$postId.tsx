import { json, LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );
  const data = await response.json();
  return json({ post: data });
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>投稿詳細</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
