import React, { useState } from "react";
import styles from "./Login.module.css";

import { Link, useNavigate } from "react-router-dom";

const base_url = "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return setMessage("Fill in all the details");
    const loginUser = {
      email,
      password,
    };
    const res = await fetch(`${base_url}/login`, {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      setMessage((mes) => "successful");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else {
      setMessage((mes) => "error in loading json response");
      navigate("/signup");
    }
  }
  return (
    <div className={styles.login}>
      <form>
        <fieldset>
          <legend>Login Page</legend>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail((val) => e.target.value);
            }}
            placeholder="email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword((val) => e.target.value);
            }}
            autoComplete="new-password"
            required
          />

          <button onClick={handleLogin}> Submit</button>
        </fieldset>
        {message ? <p>{message}</p> : <personalbar></personalbar>}
        <p>
          Don't have an account? <Link to={"/signup"}>Create account</Link>
        </p>
      </form>
    </div>
  );
}
