// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from './pages/Authpage/Login'; // Ensure path is correct
import DashboardHome from './pages/Dashborad/Home';
import { ViewStudent } from './pages/Dashborad/Viewstudents';
import { ViewStaff } from './pages/Dashborad/Viewstaff';



function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<DashboardHome />}></Route>
        <Route path="/viewstudent" element={<ViewStudent />}></Route>
        <Route path="/viewstaff" element={<ViewStaff />}></Route>
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
