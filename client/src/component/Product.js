import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const base_url = "http://localhost:5000";

export default function Product() {
  const { id } = useParams();
  const [product_message, setProduct_message] = useState([]);
  console.log(id);

  const [isLoading, setIsLoading] = useState(false);
  const [currProd, setCurrProd] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}/products-list/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCurrProd(data);
        } else {
          setProduct_message(
            "Error in loading data, please try again later",
            res.message
          );
        }
      } catch {
        console.log("There is some error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);
  if (isLoading) return <div>Loading the data...</div>;
  return (
    <div>
      <h3>{currProd.name}</h3>
      {/* <img src="./brand.png" /> */}
      <p>{currProd.category}</p>
      <p>{currProd.capacity}</p>
      <p>{currProd.length}</p>
      <p>{currProd.description}</p>
      <p>{currProd.color}</p>
    </div>
  );
}
