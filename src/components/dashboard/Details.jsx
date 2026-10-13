
import {
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

import { accountDetailsCollection } from "../../pages/Signup";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

export default function Details() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      try {
        // Get the currently logged-in user
        const user = auth.currentUser;

        if (!user) {
          setError("No user is currently logged in.");
          return;
        }

        // Find only this user's document
        const userQuery = query(
          accountDetailsCollection,
          where("uid", "==", user.uid),
          limit(1)
        );

        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          setDetails(querySnapshot.docs[0].data());
        } else {
          setError("User details not found.");
        }

      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Unable to retrieve user details.");
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, []);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <p>First Name: {details.Firstname}</p>
      <p>Last Name: {details.Lastname}</p>
      <p>Email: {details.email}</p>
      <p>Amount : {details.amount}</p>
    </div>
  );
}

