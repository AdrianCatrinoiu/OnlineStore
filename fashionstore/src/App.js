import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Homepage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import { checkUserSession } from "./redux/User/user.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/search/:filterType" element={<Search />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
