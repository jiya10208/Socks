import React, { useEffect, useState } from "react";
import styles from "../pages/./NameList.module.css";
import brandImage from "./brand.png";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";

const base_url = "http://localhost:5000";

export default function ReqList() {
  const Curr_auth = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(false);
  const [prodReqList, setProdReqList] = useState([]);
  const [prodReq_mess, setProdReq_mess] = useState([]);

  async function deleteProdReq(_id) {
    console.log(_id);
    try {
      const res = await fetch(`${base_url}/products-Req/${_id}`, {
        method: "Delete",
      });
      const result = await res.json();
      console.log(result);
      setProdReq_mess("record is deleted");
      // await fetchProducts();
    } catch {
      setProdReq_mess("Error in delete data, please try again later");
    } finally {
      // await fetchProducts();
    }
  }
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${base_url}/products-Req?email=${encodeURIComponent(
            Curr_auth.email
          )}`
        );
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setProdReqList(data);
        } else {
          setProdReq_mess("Error in loading data, please try again later");
        }
      } catch {
        setProdReq_mess("There is some error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [setProdReqList]);

  if (isLoading) return <h1>Loading the data</h1>;
  if (prodReqList.length === 0)
    return <h1> No data for now, please try again later</h1>;

  if (!prodReqList) return <p>message</p>;

  return (
    <div className={styles.main}>
      .{/* <h1>List of all socks</h1> */}
      <div className={styles.mainCotaniner}>
        {prodReqList.map((product) => (
          <div className={styles.prodItem} key={product._id}>
            <Link to={`product/${product._id}`}>
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
                  price: <em>{product.price} </em>
                </p>
                {"  "}
                <p> length: {product.size}</p>
              </div>
            </Link>
            <button> Show Details</button>

            <button
              className={styles.delete}
              onClick={() => deleteProdReq(product._id)}
            >
              <MdDelete /> Delete requested item
            </button>
            <p> {prodReq_mess}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
