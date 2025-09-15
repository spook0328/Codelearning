import { useEffect, useState } from "react";
export default function profile() {
  const [data, setDat] = useState(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const myFunction = async () => {
      setLoading(true);
      let response = await fetch("http://localhost:3000/student");
      let data = await response.json();
      setData(data);
      setLoading(false);
    };
    myFunction();
  }, []);

  return (
    <div>
      <h1>{isLoading && "Loading"}</h1>
      {data &&
        data.map((d) => {
          return <p>{d.name}</p>;
        })}
    </div>
  );
}
