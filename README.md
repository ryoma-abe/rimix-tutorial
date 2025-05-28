outlet

親ルートに何において小ルートがレンダリングされる場所を示すために使われる

メタデータ
データのためのデータ

```
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
```

ローダー
レンダリング時にデータを取得するためサーバー側で実行される関数
サーバーレンダリング時にデータを簡単に取得することができる

uselorederで受け取る
  const { posts } = useLoaderData<typeof loader>();


ダイナミックセグメント
動的に変わるURLのパス部分をマッチさせて、その値をコード上で使用することができる

action
フォームデータをサーバー側で簡単に処理できる
# rimix-tutorial
