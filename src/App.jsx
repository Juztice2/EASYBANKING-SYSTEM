import {  Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  const {loading, currentUser} = useAuth();
if(loading){
 return(
  <div>
     <p className="justify-self-center text-3xl text-green-600 font-poppins mt-32">Loading...</p>
     
  </div>
 ) 
}
  return (
    
      <Routes>
       <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <Home/>} />
        <Route path="/home" element={currentUser ? <Navigate to="/dashboard" replace /> : <Home/>} />
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <Login/>} />
         <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />} />

        <Route path="/Dashboard" element={
               <ProtectedRoute>
                <Dashboard />
             </ProtectedRoute>} />
      </Routes>
  );
}

export default App;