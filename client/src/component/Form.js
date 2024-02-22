import React, { useState } from "react";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const auth = localStorage.getItem("user");
  const CurrUser = JSON.parse(auth);

  const [product_name, setProduct_name] = useState("");
  const [product_price, setProduct_price] = useState("");
  const [product_category, setProduct_category] = useState("");
  const [product_description, setProduct_description] = useState("");
  const [product_length, setProduct_length] = useState("");
  const [product_quantity, setProduct_quantity] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      setMessage("error", error);
    };
  }

  const base_url = "http://localhost:5000";

  async function addSockRequirement(e) {
    e.preventDefault();
    if (
      (!product_name,
      !product_category,
      !product_quantity,
      !product_description,
      !product_length,
      !product_price)
    ) {
      setMessage("Fill all the details");
      return;
    }

    const productReq = {
      name: product_name,
      category: product_category,
      quantity: product_quantity,
      length: product_length,
      price: product_price,
      email: CurrUser.email,
      description: product_description,
    };

    const res = await fetch(`${base_url}/add-product`, {
      method: "POST",
      body: JSON.stringify(productReq),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setMessage((mes) => "succesful");
      localStorage.setItem("Product_required", JSON.stringify(data));
      navigate("/");
    } else {
      setMessage(
        (mes) => `Error parsing JSON response: ${res.status} ${res.statusText}`
      );

      navigate("/add-product");
    }
  }
  return (
    <div className={styles.add_product}>
      <form>
        <fieldset>
          <legend>Add socks requirement</legend>
          <p className={styles.detail}>
            Name the type of item you want and provide us detail description
            along with image so that we avail you that item, and fill the
            necessary detsails
          </p>
          <input
            type="name"
            value={product_name}
            onChange={(e) => {
              setProduct_name((val) => e.target.value);
            }}
            placeholder="name of product"
            name="name"
            required
          />
          <input
            accept="image/*"
            type="file"
            required
            onChange={convertToBase64}
          />
          <input
            type="price"
            value={product_price}
            onChange={(e) => {
              setProduct_price((val) => e.target.value);
            }}
            placeholder="cost of product"
            name="price"
            required
          />
          <input
            type="quantity"
            value={product_quantity}
            onChange={(e) => {
              setProduct_quantity((val) => e.target.value);
            }}
            placeholder="quantity required"
            name="price"
            required
          />

          <select
            id="socks_category"
            name="cars"
            value={product_category}
            onChange={(e) => setProduct_category(e.target.value)}
          >
            <option value="male"> category:: male</option>
            <option value="female" selected>
              female
            </option>
            <option value="kids">kids</option>
          </select>

          <label htmlFor="description">
            <textarea
              name="postContent"
              placeholder="Description:Write something about content"
              rows={4}
              cols={60}
              id="description"
              value={product_description}
              onChange={(e) => setProduct_description(e.target.value)}
            />
          </label>
          <select
            id="socks_length"
            name="cars"
            value={product_length}
            onChange={(e) => setProduct_length(e.target.value)}
          >
            <option value="knee">size: knee</option>
            <option value="over-knee">Over- knee</option>
            <option value="ankle" selected>
              ankle/quarter
            </option>
            <option value="lofer">lofer/ no-show</option>
            <option value="guthna">gutna/loose</option>
          </select>

          <button onClick={addSockRequirement}> Submit</button>
        </fieldset>
        <p>{message}</p>
      </form>
    </div>
  );
}
