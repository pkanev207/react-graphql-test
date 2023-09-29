import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import { GET_KITTENS } from "../kittens/KittensList";
import { GET_KITTEN } from "../kitten/Kitten";

export const UPDATE_KITTY = gql`
  mutation UpdateKitty($kittyId: ID!, $name: String!, $breed: String) {
    updateKitten(id: $kittyId, name: $name, breed: $breed) {
      name
      breed
      id
    }
  }
`;

export default function Edit() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (state === null) {
    // throw new Error("Not authorized");
    navigate("/");
  }

  const { id } = state;
  const [updateKitty] = useMutation(UPDATE_KITTY);
  const [formData, setFormData] = useState({ name: "", breed: "" });

  const { loading, error, data } = useQuery(GET_KITTEN, {
    variables: { id },
  });

  if (loading) {
    return <div className="InfoBox">Loading...</div>;
  }

  if (error) {
    return <div className="InfoBox">Error: {error.message}</div>;
  }

  const { breed, name, id: kittyId } = data.getKitten;

  useEffect(() => {
    setFormData({ name, breed });
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(formData);
    updateKitty({
      variables: { kittyId, name: formData.name, breed: formData.breed },
      refetchQueries: [GET_KITTENS, "GetKittens"],
    });

    setFormData({ name: "", breed: "" });
    navigate("/", { state: {} });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  return (
    <div className="FormContainer">
      <p>Edit kitty</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" value={formData.name} name="name" id="name" onChange={onChange} />
        <label htmlFor="breed">Breed</label>
        <input type="text" value={formData.breed} name="breed" id="breed" onChange={onChange} />
        <input type="submit" value="Edit" />
      </form>
    </div>
  );
}
