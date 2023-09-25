import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Typography from "./components/Typography";
import KittensList from "./pages/kittens/KittensList";
import Kitten from "./pages/kitten/Kitten";
import Register from "./pages/register/Register";
import "./styles/styles.scss";

// set "noEmit": true in tsconfig.json
function App() {
  console.log(process.env.S3_API);
  console.log(process.env.STRANGE_INDIAN_NAME);
  console.log(process.env.NODE_ENV);

  return (
    <BrowserRouter>
      <div className="Container">
        <header className="App">Hello World...!!!!!</header>
        <Typography variant="h2">Render H2</Typography>
        <Routes>
          <Route path="/:id" element={<Kitten />} />
          <Route path="/" element={<KittensList />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
