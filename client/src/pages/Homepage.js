import React from "react";

export default function Homepage() {
  const auth = localStorage.getItem("user");
  const CurrUser = JSON.parse(auth);
  return (
    <div>
      Hey,
      {CurrUser.name}
    </div>
  );
}
