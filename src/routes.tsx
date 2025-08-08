import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Auth/Login/LoginPage";
import SignupPage from "./pages/Auth/Signup/SignupPage";
import ForgotPage from "./pages/Auth/ForgotPassword/ForgotPassword";
import Register from "./pages/Register";

export default function AppRoutes() {
    return (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPage/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Navigate to="/home" replace />} />
       </Routes>     
    )
}