import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const auth = localStorage.getItem("user");
  const CurrUser = JSON.parse(auth);

  const url = window.location.pathname;

  const navigate = useNavigate();
  const logout = () => {
    console.log("apple");
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <nav className={styles.nav}>
      {/* {auth ? ( */}
      <>
        <ul>
          <li>
            <Link to={"/"} className={`${url === "/" ? styles.active : ""}`}>
              home
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link
              to={"/form"}
              className={`${url === "/form" ? styles.active : ""}`}
            >
              Add-product
            </Link>
          </li>
          <li>
            <Link
              to={"/message"}
              className={`${url === "/message" ? styles.active : ""}`}
            >
              Message
            </Link>
          </li>
          <li>
            <Link
              to={"/product"}
              className={`${url === "/product" ? styles.active : ""}`}
            >
              Products
            </Link>
          </li>
        </ul>
      </>
      {/* ) : */}
      {!auth ? (
        <ul>
          <li>
            <Link
              to={"/signup"}
              className={`${url === "/signup" ? styles.active : ""}`}
            >
              Signup
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link
              onClick={logout}
              className={`${url === "/signup" ? styles.active : ""}`}
              to={"/signup"}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
      {/*  )} */}
    </nav>
  );
}
