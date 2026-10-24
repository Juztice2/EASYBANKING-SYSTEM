
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

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

      try {
        setDetailsLoading(true);

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
          setError(<p className="text-red-600 font-poppins">Unable to retrieve user details..check network connection</p>);
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
    loading: authLoading || detailsLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

