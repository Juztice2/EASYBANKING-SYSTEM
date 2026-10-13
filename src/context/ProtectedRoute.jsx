import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Firebase is still checking the user
  if (loading) {
    return( 
    
       <p className="justify-self-center text-lg text-green-700 font-poppins">Load...</p>
    ) 
  }

  // Firebase finished checking and there is no user
  if (!currentUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;