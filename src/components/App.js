import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchURL = "https://dummyjson.com/products";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(fetchURL);
        // Check if response data has a `products` key or use `response.data` directly
        const productsData = response.data;
        // const products = response.data.products;
        if (productsData.products) {
          setData(productsData.products.length ? productsData.products : "[]"); // Handle empty array
        } else {
          setData(productsData.length ? productsData : "[]"); // Handle empty array if no `products` key
        }
        setError(null); // Clear any previous errors
        // error
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

  if (data === null) {
    return (
      <div>
        <h1>Loading</h1>
        <pre>Loading...</pre>
      </div>
    );
  }

  if (data === "[]") {
    return (
      <div>
        <h1>No Data</h1>
        <pre>{data}</pre>
      </div>
    );
  }

  // Assuming data is an array of products
  return (
    <div>
      <h1>Data Fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default App;
