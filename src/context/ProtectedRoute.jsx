
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute() {
  const { currentUser, loading } = useAuth();

  // Wait for Firebase to check the user's authentication state
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg text-green-700 font-poppins">
          Loading...
        </p>
      </div>
    );
  }

  // Redirect unauthenticated users to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route
  return <Outlet />;
}

export default ProtectedRoute;
