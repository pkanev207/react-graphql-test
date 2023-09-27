import React from "react";
import { Link } from "react-router-dom";
import Typography from "../Typography";

export default function Header() {
  const { name, token } = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(name, token);

  return (
    <div className="Holder">
      <header className="App">Hello World...!!!!!</header>
      <Typography variant="h2">Render H2</Typography>
      <Link to={"/"}>Home</Link>
      {name ? (
        <>
          <Link to={"/create"} style={{ color: "limegreen", textDecoration: "none" }}>
            Create
          </Link>
          <button
            onClick={() => {
              console.log("Clicked!!!");
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
}
