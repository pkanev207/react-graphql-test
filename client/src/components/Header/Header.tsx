import React from "react";
import { Link } from "react-router-dom";
import Typography from "../Typography";

export default function Header() {
  const { name } = JSON.parse(localStorage.getItem("user") || "{}");
  // console.log(name, token);

  return (
    <div className="Holder">
      <header className="App">{name ? `Hello ${name}...!!!!!` : "Hello World...!!!!!"}</header>
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

// The most straightforward way to ensure that the UI and store state reflects
// the current user's permissions is to call client.resetStore()
// after your login or logout process has completed.
// This will cause the store to be cleared and all active queries to be refetched.
// If you just want the store to be cleared and don't want to refetch active queries,
// use client.clearStore() instead. Another option is to reload the page,
// which will have a similar effect.
