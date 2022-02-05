import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/HomePage/HomePage";
import Search from "./pages/Search/Search";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
