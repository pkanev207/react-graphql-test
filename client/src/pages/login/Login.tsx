import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div>
      <div className="FormContainer">
        <h3>Login</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" value={email} onChange={onChange} />
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={password} onChange={onChange} />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
