
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db, auth } from "../firebase";

const supportChatsCollection = collection(db, "supportChats");

// Create or retrieve the customer's support conversation
export async function createSupportChat(customerName) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in before contacting support.");
  }

  const chatRef = doc(supportChatsCollection, user.uid);
  const chatSnapshot = await getDoc(chatRef);

  if (chatSnapshot.exists()) {
    return chatRef.id;
  }

  await setDoc(chatRef, {
    uid: user.uid,
    customerName: customerName || "EASYBANK Customer",
    status: "open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return chatRef.id;
}

// Send a customer message
export async function sendSupportMessage(chatId, text) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must log in before sending a message.");
  }

  if (!text.trim()) {
    throw new Error("Message cannot be empty.");
  }

  const chatRef = doc(db, "supportChats", chatId);
  const chatSnapshot = await getDoc(chatRef);

  if (!chatSnapshot.exists()) {
    throw new Error("Support conversation not found.");
  }

  if (chatSnapshot.data().uid !== user.uid) {
    throw new Error("You cannot send messages to this conversation.");
  }

  if (chatSnapshot.data().status !== "open") {
    throw new Error("This conversation is closed.");
  }

  const messagesCollection = collection(chatRef, "messages");

  await addDoc(messagesCollection, {
    senderId: user.uid,
    senderRole: "customer",
    text: text.trim(),
    createdAt: serverTimestamp(),
    read: false,
  });

  await updateDoc(chatRef, {
    updatedAt: serverTimestamp(),
  });
}

// Listen for messages in real time
export function listenToSupportMessages(chatId, callback, onError) {
  const messagesRef = collection(
    db,
    "supportChats",
    chatId,
    "messages"
  );

  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      const messages = snapshot.docs.map((messageDoc) => ({
        id: messageDoc.id,
        ...messageDoc.data(),
      }));

      callback(messages);
    },
    (error) => {
      console.error("Unable to listen to support messages:", error);

      if (onError) {
        onError(error);
      }
    }
  );
}

