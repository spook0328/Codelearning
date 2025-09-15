import { useEffect, useState } from "react";
import Link from "next/link";

//server-side Rendering 每次被叫出都會執行
// export async function getServerSideProps() {
//   const response = await fetch("http://localhost:8080/students");
//   const data = await response.json();
//   return {
//     props: {
//       data,
//     },
//   };
// }
// Dynamic Routes 差別在於只會執行一次
export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();
  return {
    props: { data },
  };
}
export default function profile({ data }) {
  // const [data, setDat] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   const myFunction = async () => {
  //     setLoading(true);
  //     let response = await fetch("http://localhost:8080/student");
  //     let data = await response.json();
  //     setData(data);
  //     setLoading(false);
  //   };
  //   myFunction();
  // }, []);

  return (
    <div>
      {/* <h1>{isLoading && "Loading"}</h1>
      {data &&
        data.map((d) => {
          return <p>{d.name}</p>;
        })} */}

      {data &&
        data.map((d) => {
          return (
            <Link style={{ padding: "2rem" }} href={`/profile/${d._id}`}>
              {d.name}
            </Link>
          );
        })}
    </div>
  );
}
