import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import styles from "./Kitten.module.css";

export default function Kitten() {
  const { id } = useParams();
  const GET_KITTEN = gql`
    query GetKitten($id: ID!) {
      getKitten(id: $id) {
        id
        name
        breed
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_KITTEN, {
    variables: { id },
  });

  if (loading) {
    return <div className="InfoBox">Loading...</div>;
  }

  if (error) {
    return <div className="InfoBox">Error: {error.message}</div>;
  }

  console.log(data.getKitten);

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
      </ul>
    </div>
  );
}
