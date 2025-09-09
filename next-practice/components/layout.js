//在這設定所有板型是什麼，不用在到其他地方更改
import Head from "next/head";
import Link from "next/link";
const name = "Eric Wong";
const websiteTitle = "Next.js練習網站";
//latout({})，{}這是一個物件。
//包在這各layout 裡面的會成為他的children 相關，我有套用到index.js上。
export default function Layout({ children, returnBack }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Eric Wong" />
      </Head>
      <header>
        <h1>{websiteTitle}</h1>
        <h2>作者: {name}</h2>
      </header>
      <main>{children}</main>
      {/* 設立returnBack屬性，可以去決定更多內容 */}
      {returnBack && <Link href="/">回到首頁</Link>}
    </div>
  );
}
