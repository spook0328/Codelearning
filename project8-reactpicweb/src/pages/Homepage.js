import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";
// logical operator &&

const Homepage = () => {
  let [data, setData] = useState(null);
  const auth = "Xenb6GvuH4VD3FoM9A9a3IX8M9POQL1a5WUculIKDTTaq8f5eirvL9KA";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";

  const search = async () => {
    let result = await axios.get(initialURL, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search search={search} />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
