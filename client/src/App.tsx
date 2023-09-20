import React from "react";
import Typography from "./components/Typography";

// set "noEmit": true in tsconfig.json
function App() {
  console.log(process.env.S3_API);
  console.log(process.env.STRANGE_INDIAN_NAME);

  return (
    <div className="App">
      <h1>Hello World..!!!!!</h1>
      <Typography variant="h2">Render H2</Typography>
    </div>
  );
}
export default App;