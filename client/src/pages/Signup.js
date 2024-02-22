import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";

const base_url = "http://localhost:5000";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  useEffect(() => {
    auth ? navigate("/") : navigate("/signup");
  }, [auth, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword || !name || !message) {
      return setMessage("Fill in all the details");
    }
    if (password !== confirmPassword && password) {
      setMessage((mes) => "Password is not the same as Confirm password");
      return;
    }
    if (password.length < 5) {
      setMessage((mes) => "Password length is less than 6");
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    const res = await fetch(`${base_url}/register`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      setMessage((mes) => "successful");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } else if (res.status === 400) {
      console.log(res.status);
      console.log(res.status);
      setMessage((mes) => ` email already exist`);
      navigate("/signup");
    } else {
      setMessage((mes) => ` error in signing you up, pleae try again later`);
      console.log(res.preview);
      navigate("/signup");
    }
  }
  return (
    <div className={styles.login}>
      <form>
        <fieldset>
          <legend>Signup Page</legend>

          <input
            type="text"
            placeholder="Full name"
            name="name"
            id="fullname"
            value={name}
            onChange={(e) => {
              setName((val) => e.target.value);
            }}
            required
          />
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
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword((val) => e.target.value);
            }}
            autoComplete="new-password"
            required
          />
          <button onClick={handleSubmit}> Submit</button>
        </fieldset>
        {message ? <p>{message}</p> : <personalbar></personalbar>}
        <p>
          Already have an account? <Link to={"/login"}>Login Now</Link>
        </p>
      </form>
    </div>
  );
}
