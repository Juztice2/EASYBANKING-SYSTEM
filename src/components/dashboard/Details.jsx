
import { useAuth } from "../../context/AuthContext";

export default function Details() {
  const { details, loading, error } = useAuth();

  if (loading) {
    return <p>Loading account details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!details) {
    return <p>User details not found.</p>;
  }

  return (
    <div>
      <p>First Name: {details.Firstname}</p>
      <p>Last Name: {details.Lastname}</p>
      <p>Email: {details.email}</p>
      <p>Account : {details.account}</p>
    </div>
  );
}

