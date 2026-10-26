import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { accountDetailsCollection } from "../pages/Signup";

const AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Monitor Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
      },
      (err) => {
        console.error("Authentication error:", err);
        setError("Unable to verify authentication.");
        setAuthLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const refreshAccountDetails = async () => {
  if (!auth.currentUser) return;

  try {
    const userQuery = query(
      accountDetailsCollection,
      where("uid", "==", auth.currentUser.uid),
      limit(1)
    );

    const snapshot = await getDocs(userQuery);

    if (!snapshot.empty) {
      const accountDoc = snapshot.docs[0];

      setDetails({
        id: accountDoc.id,
        ...accountDoc.data(),
      });

      setError("");
    } else {
      setDetails(null);
      setError("Unable to retrieve user details.");
    }
  } catch (err) {
    console.error("Error refreshing account details:", err);
    setError("Unable to refresh account details.");
  }
};

  // Fetch the authenticated user's account details
  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const getDetails = async () => {
      setDetails(null);
      setError("");

      if (!currentUser) {
        setDetailsLoading(false);
        return;
      }

      setDetailsLoading(true);

      try {
        const userQuery = query(
          accountDetailsCollection,
          where("uid", "==", currentUser.uid),
          limit(1)
        );

        const snapshot = await getDocs(userQuery);

        if (cancelled) return;

        if (!snapshot.empty) {
          const accountDoc = snapshot.docs[0];

          setDetails({
            id: accountDoc.id,
            ...accountDoc.data(),
          });
        } else {
          setError(
            "Unable to retrieve user details. Please check your account or network connection."
          );
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching user details:", err);
          setError("Unable to retrieve user details.");
        }
      } finally {
        if (!cancelled) {
          setDetailsLoading(false);
        }
      }
    };

    getDetails();

    return () => {
      cancelled = true;
    };
  }, [currentUser, authLoading]);

  const value = {
    currentUser,
    details,
    error,
    authLoading,
    detailsLoading,
    loading: authLoading || detailsLoading,
    refreshAccountDetails,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

