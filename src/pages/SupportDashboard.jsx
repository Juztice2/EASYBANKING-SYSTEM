import { useEffect, useState } from "react";
import {
  Headset,
  Search,
  Send,
  MessageCircle,
  Clock,
  UserRound,
  ArrowLeft,
} from "lucide-react";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../firebase";
import { listenToSupportMessages } from "../service/chatService";


export default function SupportDashboard() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Listen for customer conversations
  useEffect(() => {
    const chatsQuery = query(
      collection(db, "supportChats"),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      chatsQuery,
      (snapshot) => {
        const conversations = snapshot.docs.map((chatDoc) => ({
          id: chatDoc.id,
          ...chatDoc.data(),
        }));

        setChats(conversations);
        setLoading(false);

        // Keep the selected conversation up to date
        setSelectedChat((previous) => {
          if (!previous) return previous;

          return (
            conversations.find((chat) => chat.id === previous.id) ||
            previous
          );
        });
      },
      (err) => {
        console.error("Unable to load support conversations:", err);
        setError("Unable to load conversations. Check your permissions.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  // Listen for messages in the selected conversation
  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }

    const unsubscribe = listenToSupportMessages(
      selectedChat.id,
      setMessages,
      (err) => {
        console.error("Unable to load conversation messages:", err);
        setError("Unable to load this conversation's messages.");
      }
    );

    return unsubscribe;
  }, [selectedChat?.id]);

  // Send a reply as the support agent
  async function handleSendReply(e) {
    e.preventDefault();

    const text = reply.trim();

    if (!text || !selectedChat || sending) return;

    const agent = auth.currentUser;

    if (!agent) {
      setError("Please sign in with an authorized support account.");
      return;
    }

    if (selectedChat.status !== "open") {
      setError("This conversation is closed.");
      return;
    }

    try {
      setSending(true);
      setError("");

      const chatRef = doc(db, "supportChats", selectedChat.id);

      await addDoc(collection(chatRef, "messages"), {
        senderId: agent.uid,
        senderRole: "agent",
        text,
        createdAt: serverTimestamp(),
        read: false,
      });

      await updateDoc(chatRef, {
        updatedAt: serverTimestamp(),
      });

      setReply("");
    } catch (err) {
      console.error("Unable to send support reply:", err);
      setError("Your reply could not be sent. Check your access permissions.");
    } finally {
      setSending(false);
    }
  }

  const filteredChats = chats.filter((chat) => {
    const customerName = (chat.customerName || "").toLowerCase();
    const customerEmail = (chat.customerEmail || "").toLowerCase();
    const searchText = search.toLowerCase();

    return (
      customerName.includes(searchText) ||
      customerEmail.includes(searchText) ||
      chat.id.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-poppins sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <Headset size={22} />
            <span className="text-sm font-semibold">
              EASYBANK ADMINISTRATION
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Support Agent Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage customer conversations and respond to enquiries.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Total conversations
              </p>
              <MessageCircle className="text-blue-600" size={21} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {chats.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Open conversations
              </p>
              <Clock className="text-amber-500" size={21} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {chats.filter((chat) => chat.status === "open").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Other conversations
              </p>
              <UserRound className="text-emerald-600" size={21} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {chats.filter((chat) => chat.status !== "open").length}
            </h2>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Main support interface */}
        <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[350px_1fr]">
          {/* Conversation list */}
          <aside
            className={`border-r border-slate-100 ${
              selectedChat ? "hidden lg:block" : "block"
            }`}
          >
            <div className="border-b border-slate-100 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Conversations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer support inbox
              </p>

              <div className="relative mt-4">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="max-h-[570px] overflow-y-auto">
              {loading ? (
                <p className="p-6 text-center text-sm text-slate-500">
                  Loading conversations...
                </p>
              ) : filteredChats.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-500">
                  No conversations found.
                </p>
              ) : (
                filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setSelectedChat(chat);
                      setError("");
                    }}
                    className={`w-full border-b border-slate-100 p-5 text-left transition hover:bg-blue-50 ${
                      selectedChat?.id === chat.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <UserRound size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-sm font-semibold text-slate-900">
                            {chat.customerName || "EASYBANK Customer"}
                          </h3>

                          <span
                            className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                              chat.status === "open"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {chat.status || "unknown"}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {chat.customerEmail || `Customer ID: ${chat.uid || chat.id}`}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {chat.updatedAt?.toDate
                            ? chat.updatedAt.toDate().toLocaleString()
                            : "Recently created"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Selected conversation */}
          <section
            className={`min-w-0 flex-col ${
              selectedChat ? "flex" : "hidden lg:flex"
            }`}
          >
            {selectedChat ? (
              <>
                <header className="flex items-center gap-3 border-b border-slate-100 p-5">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft size={20} />
                  </button>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Headset size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-bold text-slate-900">
                      {selectedChat.customerName || "EASYBANK Customer"}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {selectedChat.status === "open"
                        ? "Conversation open"
                        : "Conversation closed"}
                    </p>
                  </div>
                </header>

                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-5">
                  {messages.length === 0 ? (
                    <p className="py-10 text-center text-sm text-slate-500">
                      No messages in this conversation yet.
                    </p>
                  ) : (
                    messages.map((item) => {
                      const isAgent = item.senderRole === "agent";

                      return (
                        <div
                          key={item.id}
                          className={`flex ${
                            isAgent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div className="max-w-[85%] sm:max-w-[75%]">
                            <p className="mb-1 text-xs text-slate-500">
                              {isAgent ? "Support Agent" : "Customer"}
                            </p>

                            <div
                              className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                                isAgent
                                  ? "rounded-br-sm bg-blue-600 text-white"
                                  : "rounded-bl-sm bg-white text-slate-700 shadow-sm"
                              }`}
                            >
                              <p className="break-words">{item.text}</p>
                            </div>

                            <p className="mt-1 text-[11px] text-slate-400">
                              {item.createdAt?.toDate
                                ? item.createdAt.toDate().toLocaleString()
                                : "Sending..."}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form
                  onSubmit={handleSendReply}
                  className="border-t border-slate-100 p-4 sm:p-5"
                >
                  <div className="flex items-end gap-3">
                    <textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder={
                        selectedChat.status === "open"
                          ? "Write a reply to the customer..."
                          : "This conversation is closed."
                      }
                      disabled={selectedChat.status !== "open" || sending}
                      rows={2}
                      className="w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100"
                    />

                    <button
                      type="submit"
                      disabled={
                        !reply.trim() ||
                        sending ||
                        selectedChat.status !== "open"
                      }
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={17} />
                      <span className="hidden sm:inline">
                        {sending ? "Sending..." : "Reply"}
                      </span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <MessageCircle size={38} />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Welcome to EASYBANK Support
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Select a customer conversation from the inbox to read
                  their messages and respond.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

