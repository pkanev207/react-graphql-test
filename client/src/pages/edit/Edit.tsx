import React from "react";
import { useLocation } from "react-router-dom";

export default function Edit() {
  const { state } = useLocation();
  console.log(state.id);

  return <div>Edit page</div>;
}
