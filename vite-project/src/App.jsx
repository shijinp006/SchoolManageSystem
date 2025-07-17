// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from './pages/Authpage/Login'; // Ensure path is correct
import './App.css';


function App() {
  return (
    <BrowserRouter>
        <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
