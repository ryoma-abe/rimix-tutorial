# Remix の基本学習まとめ

## ✅ Outlet（アウトレット）

- 親ルート内で子ルートを**どこに表示するか**を指定するコンポーネント。
- ネストされたレイアウトに対応。
- 使用例：

  ```tsx
  import { Outlet } from "@remix-run/react";

  export default function Layout() {
    return (
      <div>
        <h1>共通レイアウト</h1>
        <Outlet />
      </div>
    );
  }
  ```
````

---

## ✅ メタデータ（meta）

- HTML の`<head>`に入る**タイトルや説明**などの情報を指定。
- SEO や SNS での表示に重要。
- 使用例：

  ```ts
  import type { MetaFunction } from "@remix-run/node";

  export const meta: MetaFunction = () => [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
  ```

---

## ✅ ローダー（loader）

- ページ描画前に**サーバー側でデータを取得**する関数。
- SSR（サーバーサイドレンダリング）に対応。
- 使用例：

  ```ts
  import { json } from "@remix-run/node";
  import { useLoaderData } from "@remix-run/react";

  export const loader = async () => {
    const res = await fetch("https://api.example.com/posts");
    const posts = await res.json();
    return json({ posts });
  };

  export default function Posts() {
    const { posts } = useLoaderData<typeof loader>();
    return (
      <ul>
        {posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    );
  }
  ```

---

## ✅ ダイナミックセグメント

- URL の可変部分をルートファイル名で定義（例：`$postId`）。

- 使用例：

  ```bash
  app/routes/post.$postId.tsx
  ```

- `/post/123` にアクセスすると、`useParams().postId` で `"123"` を取得できる。

---

## ✅ アクション（action）

- フォーム送信時の**サーバー側処理**を行う関数。
- データの保存・バリデーション・リダイレクト処理などに使用。
- 使用例：

  ```ts
  import { redirect } from "@remix-run/react";
  import type { ActionFunctionArgs } from "@remix-run/node";

  export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get("title");
    const body = formData.get("body");
    console.log(title, body);
    return redirect("/");
  };
  ```