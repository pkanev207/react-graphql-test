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
// console.log(process.env.S3_API, process.env.STRANGE_INDIAN_NAME, process.env.NODE_ENV);

function App() {
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
