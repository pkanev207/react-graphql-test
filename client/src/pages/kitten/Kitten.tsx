import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { GET_KITTENS } from "../kittens/KittensList";
import styles from "./Kitten.module.scss";

export default function Kitten() {
  const { id } = useParams();
  const navigate = useNavigate();

  const GET_KITTEN = gql`
    query GetKitten($id: ID!) {
      getKitten(id: $id) {
        id
        name
        breed
      }
    }
  `;

  const DELETE_KITTY = gql`
    mutation DeleteKitty($id: ID!) {
      deleteKitten(id: $id) {
        name
      }
    }
  `;

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
        <li className="Holder">
          <button
            onClick={() => {
              console.log("Clicked!");
              navigate("/edit", { state: { id } });
            }}
            className={styles.DeleteButton}
            style={{ color: "limegreen" }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              console.log("Clicked!");
              console.log(delData);
              deleteKitty({ variables: { id } });

              navigate("/");
            }}
            className={styles.DeleteButton}
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

// The error "Rendered more hooks than during the previous render"
// occurs when we conditionally call a hook or return early
// before all hooks have run.

// To solve the error, move all hooks at the top level of the function component
// and don't use hooks inside conditions.
