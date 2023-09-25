import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { GET_KITTENS } from "../kittens/KittensList";

const CREATE_KITTY = gql`
  mutation CreateKitty($name: String!, $breed: String!) {
    createKitten(name: $name, breed: $breed) {
      id
      name
      breed
    }
  }
`;

export default function Create() {
  const [createKitty] = useMutation(CREATE_KITTY);
  const [formData, setFormData] = useState({ name: "", breed: "" });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    createKitty({
      variables: { name: formData.name, breed: formData.breed },
      refetchQueries: [GET_KITTENS, "GetKittens"],
    });

    setFormData({ name: "", breed: "" });
    navigate("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="FormContainer">
      <p>Create kitty</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={onChange} />
        <label htmlFor="breed">Breed</label>
        <input type="text" name="breed" id="breed" onChange={onChange} />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
