import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import KittensList from "./pages/kittens/KittensList";
import Kitten from "./pages/kitten/Kitten";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import "./styles/styles.scss";

// set "noEmit": true in tsconfig.json
function App() {
  console.log(process.env.S3_API);
  console.log(process.env.STRANGE_INDIAN_NAME);
  console.log(process.env.NODE_ENV);

  return (
    <BrowserRouter>
      <div className="Container">
        <Header />
        <Routes>
          <Route path="/:id" element={<Kitten />} />
          <Route path="/" element={<KittensList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

// import { useHistory, useLocation } from "react-router-dom";
// const history = useHistory();
// const location = useLocation();
// console.log(history.location.pathname === location.pathname);
