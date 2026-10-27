import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";

export default function useSupportAgent() {
  const [isAgent, setIsAgent] = useState(false);
  const [checkingAgent, setCheckingAgent] = useState(true);
  const [agentError, setAgentError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (!cancelled) {
          setIsAgent(false);
          setCheckingAgent(false);
        }
        return;
      }

      try {
        if (!cancelled) {
          setCheckingAgent(true);
          setAgentError("");
        }

        const agentRef = doc(db, "supportAgents", user.uid);
        const agentSnapshot = await getDoc(agentRef);

        const authorized =
          agentSnapshot.exists() &&
          agentSnapshot.data().active === true &&
          agentSnapshot.data().role === "support";

        if (!cancelled) {
          setIsAgent(authorized);
        }
      } catch (error) {
        console.error("Support-agent verification failed:", error);

        if (!cancelled) {
          setIsAgent(false);
          setAgentError(
            "Unable to verify support-agent access. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setCheckingAgent(false);
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return { isAgent, checkingAgent, agentError };
}

