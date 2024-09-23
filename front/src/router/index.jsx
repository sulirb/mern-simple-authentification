import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../Home";
import Signup from "../Signup";
import Login from "../Login";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
