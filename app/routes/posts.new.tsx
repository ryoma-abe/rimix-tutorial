import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  console.log(title, body);
  return redirect("/");
};
export default function New() {
  return (
    <div>
      <Form method="post">
        <input type="text" name="title" className="border" />
        <textarea name="body" className="border"></textarea>
        <button type="submit">作成</button>
      </Form>
    </div>
  );
}
