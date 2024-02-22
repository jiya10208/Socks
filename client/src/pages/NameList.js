import React, { useEffect, useState } from "react";
import styles from "./NameList.module.css";
import brandImage from "./brand.png";

import { Link } from "react-router-dom";
const base_url = "http://localhost:5000";

export default function NameList() {
  const [isLoading, setIsLoading] = useState(false);
  const [product_list, setProduct_list] = useState([]);
  const [product_message, setProduct_message] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_url}/products-list`);
        if (res.ok) {
          const data = await res.json();
          setProduct_list(data);
        } else {
          setProduct_message("Error in loading data, please try again later");
        }
      } catch {
        console.log("There is some error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [setProduct_list]);
  if (isLoading) return <h1>Loading the data</h1>;
  if (product_list.length === 0)
    return <h1> No data for now, please try again later</h1>;
  if (!product_list) return <p>message</p>;

  return (
    <div className={styles.main}>
      .{/* <h1>List of all socks</h1> */}
      <div className={styles.mainCotaniner}>
        {product_list.map((product) => (
          <Link to={`/product/${product._id}`} className={styles.prodItem}>
            <div className={styles.image}>
              <img src={brandImage} alt="Brand" />
            </div>

            <div className={styles.prod_name}>
              <p>
                <strong>{product.name}</strong>
              </p>
            </div>

            <div>
              <p>
                price: <strong>{product.price} </strong>
              </p>
              {"  "}
              <p>
                {" "}
                length: <strong>{product.size}</strong>
              </p>
            </div>

            <button> Show Details</button>
          </Link>
        ))}
      </div>
    </div>
  );
}
