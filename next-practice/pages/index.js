import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>這是網站首頁</h1>
      <Link href="/post/edit-post">Edit-Post</Link>
    </div>
  );
}
