import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/PageLoader";

function ProtectedRoute() {
  const {
    currentUser,
    authLoading,
    detailsLoading,
    details,
    isAccountDisabled,
    error,
  } = useAuth();

  // Wait for Firebase authentication.
  if (authLoading) {
    return <PageLoader />;
  }

  // Require the customer to sign in.
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Wait until the customer's account details are fetched.
  if (detailsLoading) {
    return <PageLoader />;
  }

  // Do not grant access when the account cannot be verified.
  if (!details || error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="mb-3 text-xl font-semibold text-slate-900">
            Unable to verify your account
          </h1>

          <p className="text-slate-600">
            We couldn't verify your banking account. Please try again or
            contact customer support.
          </p>

          <button
            onClick={() => window.location.assign("/customer-support")}
            className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Contact Support
          </button>
        </div>
      </div>
    );
  }

  // Block disabled customers from banking pages.
 if (isAccountDisabled) {
  return <Navigate to="/account-restricted" replace />;
}

  // Allow active customers to continue.
  return <Outlet />;
}

export default ProtectedRoute;

