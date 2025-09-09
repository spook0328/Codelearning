import Link from "next/link";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1>這是網站首頁</h1>
        <Link href="/post/edit-post">Edit-Post</Link>
        <br />
        <Link href="/newPage">NewPage</Link>
      </div>
    </Layout>
  );
}
