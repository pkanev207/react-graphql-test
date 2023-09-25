import React from "react";

export default function Register() {
  return (
    <div className="FormContainer">
      <h3>Register</h3>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </form>
    </div>
  );
}
