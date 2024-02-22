import React from "react";
import styles from "./Message.module.css";
export default function Message() {
  return (
    <div className={styles.dark_body}>
      <button className={styles.btn}>Submit</button>
    </div>
  );
}
