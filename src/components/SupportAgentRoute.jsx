
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useSupportAgent from "../hooks/useSupportAgent";

export default function SupportAgentRoute({ children }) {
  const { currentUser, loading } = useAuth();

  const {
    isAgent,
    checkingAgent,
    agentError,
  } = useSupportAgent();

  if (loading || checkingAgent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="mt-4 text-sm text-slate-600">
            Verifying support access...
          </p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (agentError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <p className="max-w-md text-center text-sm text-red-600">
          {agentError}
        </p>
      </div>
    );
  }

  if (!isAgent) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

