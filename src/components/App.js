import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import axios from "axios";

const fetchURL = "https://dummyjson.com/products";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // const getData = axios.get(fetchURL).then((response) => {
  //   //   setPost(response.data);
  //   //   console.log(response.data);
  //   // });
  //   // we will run this using axios
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(fetchURL);
  //       setData(response.data);
  //       setError(null); // Clear any previous errors
  //     } catch (error) {
  //       setError("No data found");
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getData();
  // }, []);
  // const getData = async () => {
  //   const response = await axios.get("https://reqres.in/api/users");
  //   console.log(response);
  // };

  // if (!post)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(fetchURL);
        if (response.data && response.data.products) {
          setData(response.data.products); // Assuming `response.data.products` is the actual data
        } else {
          setData([]); // Handle case where API returns no data
        }
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("An error occurred: " + error.message);
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <pre>{error}</pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h1>Loading</h1>
        <pre>Loading...</pre>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div>
        <h1>No Data</h1>
        <pre>No data found</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Data Fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
