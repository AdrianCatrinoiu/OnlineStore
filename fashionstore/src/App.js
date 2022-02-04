import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
