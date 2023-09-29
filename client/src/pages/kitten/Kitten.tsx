import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_KITTENS } from "../kittens/KittensList";
import styles from "./Kitten.module.scss";

export const GET_KITTEN = gql`
  query GetKitten($id: ID!) {
    getKitten(id: $id) {
      id
      name
      breed
      userId
    }
  }
`;
export const DELETE_KITTY = gql`
  mutation DeleteKitty($id: ID!) {
    deleteKitten(id: $id) {
      name
    }
  }
`;
export default function Kitten() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = JSON.parse(localStorage.getItem("user") || "{}");

  const { loading, error, data } = useQuery(GET_KITTEN, {
    variables: { id },
  });

  const [deleteKitty, { data: delData, loading: delLoading, error: delError }] = useMutation(DELETE_KITTY, {
    variables: { id },
    refetchQueries: [GET_KITTENS, "GetKittens"],
  });

  if (loading) {
    return <div className="InfoBox">Loading...</div>;
  }

  if (error) {
    return <div className="InfoBox">Error: {error.message}</div>;
  }

  if (delLoading) return "Deleting...";
  // Property 'message' does not exist on type 'never'.ts(2339)
  if (delError) return `Delete error! ${delError["message"]}`;

  return (
    <div className="InfoBox">
      <ul className={styles.Kitten}>
        <li>
          <p>Name</p>: {data.getKitten.name}
        </li>
        <li>
          <p>Breed</p>: {data.getKitten.breed ? data.getKitten.breed : "street precious"}
        </li>
        <li>
          <p>ID</p>: {data.getKitten.id}
        </li>
        <li>
          <p>userId</p>: {data.getKitten.userId}
        </li>
        {role === "admin" ? (
          <li className="Holder">
            <button
              onClick={() => {
                navigate("/edit", { state: { ...data.getKitten } });
              }}
              className={styles.DeleteButton}
              style={{ color: "limegreen" }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteKitty({ variables: { id } });

                navigate("/");
                console.log(delData);
              }}
              className={styles.DeleteButton}
            >
              Delete
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

// The error "Rendered more hooks than during the previous render"
// occurs when we conditionally call a hook or return early
// before all hooks have run.

// To solve the error, move all hooks at the top level of the function component
// and don't use hooks inside conditions.
