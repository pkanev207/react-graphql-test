import React from "react";
import styles from "./KittensList.module.css";

import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export const GET_KITTENS = gql`
  query GetKittens {
    getKittens {
      id
      name
      breed
      userId
    }
  }
`;

export default function KittensList() {
  const { loading, error, data } = useQuery(GET_KITTENS, {
    // pollInterval: 500,
  });

  if (loading) {
    return <div className="InfoBox">Loading...</div>;
  }

  if (error) {
    return <div className="InfoBox">Error: {error.message}</div>;
  }

  return (
    <div className={styles.Kittens}>
      <div className="Holder">
        <h4> KittensList</h4>
      </div>

      <ul>
        {data.getKittens.length === 0 ? (
          <p>No kittens!</p>
        ) : (
          data.getKittens.map((k: any) => {
            return (
              <li key={window.crypto.randomUUID()}>
                {/* <Link to={`/${k.id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}> */}
                <Link to={`/${k.id}`} style={{ textDecoration: "none" }}>
                  <p>{k.name}</p>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
