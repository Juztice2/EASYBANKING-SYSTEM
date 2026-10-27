import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  getDocs,
  query,
  where,
  limit,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
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

  // Monitor Firebase authentication.
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

  // Retrieve the current user's account document.
  const refreshAccountDetails = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      setDetails(null);
      return;
    }

    try {
      const userQuery = query(
        accountDetailsCollection,
        where("uid", "==", user.uid),
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
  }, []);

  // Fetch account details when the authenticated user changes.
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
          setDetails(null);
          setError("Unable to retrieve user details.");
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Error fetching account details:", err);
          setDetails(null);
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

  // Monitor account status in real time.
  useEffect(() => {
    if (!currentUser || !details?.id) return;

    const accountRef = doc(db, "Account", details.id);

    const unsubscribe = onSnapshot(
      accountRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setDetails(null);
          setError("Your account record could not be found.");
          return;
        }

        const accountData = snapshot.data();

        setDetails({
          id: snapshot.id,
          ...accountData,
        });
      },
      (err) => {
        console.error("Account status monitoring failed:", err);
        setError("Unable to verify your account status.");
      }
    );

    return unsubscribe;
  }, [currentUser, details?.id]);

  const accountStatus = details?.status || "active";
  const isAccountDisabled = accountStatus === "disabled";

  const value = {
    currentUser,
    details,
    error,
    authLoading,
    detailsLoading,
    loading: authLoading || detailsLoading,
    refreshAccountDetails,
    accountStatus,
    isAccountDisabled,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

