# Remix 基本文法まとめ

## ✅ Outlet（アウトレット）

- 親ルートの中で**子ルートを表示する場所**を指定するコンポーネント。
- ネストされたルート構造で、共通レイアウトに動的に内容を差し込む用途に使われる。

```tsx
import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div>
      <h1>レイアウト</h1>
      <Outlet />
    </div>
  );
}
````

---

## ✅ メタデータ（meta）

* HTMLの `<head>` に含まれる情報（タイトル・説明など）を設定する関数。
* SEOやSNSシェア時に利用される。

```ts
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
```

---

## ✅ ローダー（loader）

* ページの表示時に**サーバーで実行されるデータ取得関数**。
* クライアントでは `useLoaderData()` を使って値を受け取る。

```ts
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  const posts = await res.json();
  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

---

## ✅ ダイナミックセグメント

* ルーティングで**動的に変わるパスの値**を扱う仕組み。
* ファイル名に `$` をつけることでその部分がパラメータとして認識される。

```bash
app/routes/posts.$postId.tsx
```

```ts
import { useParams } from "@remix-run/react";

export default function Post() {
  const { postId } = useParams();
  return <p>記事ID: {postId}</p>;
}
```

---

## ✅ アクション（action）

* フォームなどから送られたデータを**サーバー側で処理する関数**。
* `request.formData()` を使ってフォームデータを取得し、保存やリダイレクト処理が可能。

```tsx
import { redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  console.log(title, body);
  return redirect("/");
};

export default function NewPost() {
  return (
    <Form method="post">
      <input type="text" name="title" placeholder="タイトル" />
      <textarea name="body" placeholder="本文"></textarea>
      <button type="submit">作成</button>
    </Form>
  );
}
```

