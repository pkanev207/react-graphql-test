import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(input: { name: $name, email: $email, password: $password }) {
      name
      token
      role
    }
  }
`;

export interface IUser {
  name: string;
  email?: string;
  password?: string;
}

export interface MyContext {
  // we'd define the properties a user should have in a separate user interface (e.g., email, id, url, etc.)
  user: IUser;
}

export default function Register() {
  const navigate = useNavigate();
  const [registerUser] = useMutation(CREATE_USER);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(name, email, password);
    if (!name || !email || !password) {
      throw new Error("Please provide name, email and password");
    }

    registerUser({
      variables: { name, email, password },
      onCompleted: (data) => {
        const { name, token, role } = data.createUser;
        localStorage.setItem("user", JSON.stringify({ name, token, role }));
        setFormData({ name: "", email: "", password: "" });
        navigate("/");
        window.location.reload();
      },
    });
  };

  return (
    <div className="FormContainer">
      <h3>Register</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={name} onChange={onChange} />
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={email} onChange={onChange} />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" value={password} onChange={onChange} />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
