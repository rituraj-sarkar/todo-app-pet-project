import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Routes, Route } from "react-router-dom";

function AuthRoutes({ setUser }) {
  return (
    <div className="AuthRoutes">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login setLoggedInUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default AuthRoutes;
