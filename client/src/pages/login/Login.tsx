//@ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      name
      token
      role
    }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;
  const [login, { loading, error, data, called }] = useLazyQuery(LOGIN_USER, { variables: { email, password } });
  // const [login] = useLazyQuery(LOGIN_USER, { variables: { email, password } });

  // useEffect(() => {
  //   login({ variables: { email, password } });
  // }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    login({
      variables: { email, password },
      onCompleted: (res) => {
        console.log("res: ", res);

        if (res.loginUser) {
          const { name, token, role } = res.loginUser;
          localStorage.setItem("user", JSON.stringify({ name, token, role }));
          setFormData({ email: "", password: "" });
          navigate("/");
          window.location.reload();
        }

        console.log("No data!!!");
        throw new Error("No such user!");
      },
    });

    if (loading) {
      return <div className="InfoBox">Loading...</div>;
    }
    if (error) {
      return <div className="InfoBox">Error: {error.message}</div>;
    }
    if (data) {
      const { name, token } = data.loginUser;
      console.log("data: ", name, role, token);
    } else {
      console.log("No data!");
      // throw new Error("No such user!");
      return <div className="InfoBox">No data...</div>;
    }

    return <div>Logged!</div>;
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
