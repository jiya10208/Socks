import React, { useState } from "react";
import Form from "../component/Form";

import styles from "./AddProduct.module.css";
import ReqList from "../component/ReqList";

export default function AddProduct() {
  const [toggleButton, setToggleButton] = useState(true);
  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" onClick={() => setToggleButton(!toggleButton)} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      {toggleButton ? <Form /> : <ReqList />}
    </div>
  );
}
