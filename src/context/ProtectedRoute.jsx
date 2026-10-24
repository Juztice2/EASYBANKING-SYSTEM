
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import PageLoader from "../components/PageLoader";

function ProtectedRoute() {
  const { currentUser, authLoading } = useAuth();

  // Wait for Firebase to check the user's authentication state
  if (authLoading) {
    return <PageLoader />;
  }

  // Redirect unauthenticated users to the login page
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected route
  return <Outlet />;
}

export default ProtectedRoute;
