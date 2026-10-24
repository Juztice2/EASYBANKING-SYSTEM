import {  Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";
import SendMoney from "./pages/SendMoney";
import ReceiveMoney from "./pages/RecieveMoney";
import MyCards from "./pages/MyCards";
import Settings from "./pages/Settings";
import PageLoader from "./components/PageLoader";

function App() {
  const {loading, currentUser} = useAuth();
if(loading){
 return(
  <div>
     <PageLoader />
     
  </div>
 ) 
}
  return (
    
     <Routes>
  {/* Public Routes */}
  <Route
    path="/"
    element={currentUser ? <Navigate to="/dashboard" replace /> : <Home />}
  />

  <Route
    path="/home"
    element={currentUser ? <Navigate to="/dashboard" replace /> : <Home />}
  />

  <Route
    path="/login"
    element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />}
  />

  <Route
    path="/signup"
    element={currentUser ? <Navigate to="/dashboard" replace /> : <Signup />}
  />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/send-money" element={<SendMoney />} />
    <Route path="/receive-money" element={<ReceiveMoney />} />
    <Route path="/my-cards" element={<MyCards />} />
    <Route path="/settings" element={<Settings />} />
  </Route>

  {/* Unknown Routes */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
  );
}

export default App;