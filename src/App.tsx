import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Auth/Login/LoginPage'
import SignupPage from './pages/Auth/Signup/SignupPage'
import ForgotPage from './pages/Auth/ForgotPassword/ForgotPassword'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPage/>}/>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes> 
      </div>
    </Router>
  )
}

export default App
