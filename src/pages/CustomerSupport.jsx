import { useEffect, useState } from "react";
import {
  Headset,
  Send,
  Paperclip,
  MoreVertical,
  ArrowLeft,
  CheckCheck,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { createSupportChat,
  sendSupportMessage,
  listenToSupportMessages,} from "../service/chatService"

export default function CustomerSupport() {
  const { currentUser, details } = useAuth();

  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Create or retrieve the customer's conversation
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      setError("Please log in to contact customer support.");
      return;
    }

    let cancelled = false;

    async function initializeChat() {
      try {
        setLoading(true);
        setError("");

        const customerName = [
          details?.Firstname,
          details?.Lastname,
        ]
          .filter(Boolean)
          .join(" ");

        const id = await createSupportChat(
          customerName || currentUser.email
        );

        if (!cancelled) {
          setChatId(id);
        }
      } catch (err) {
        console.error("Unable to initialize support chat:", err);

        if (!cancelled) {
          setError(err.message || "Unable to open customer support.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    initializeChat();

    return () => {
      cancelled = true;
    };
  }, [currentUser, details]);

  // Listen for new messages
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = listenToSupportMessages(
      chatId,
      (updatedMessages) => {
        setMessages(updatedMessages);
      },
      (err) => {
        setError("Unable to load messages. Please try again.");
        console.error(err);
      }
    );

    return unsubscribe;
  }, [chatId]);

  // Send a message
  async function handleSendMessage(e) {
    e.preventDefault();

    const text = message.trim();

    if (!text || !chatId || sending) return;

    try {
      setSending(true);
      setError("");

      await sendSupportMessage(chatId, text);

      setMessage("");
    } catch (err) {
      console.error("Unable to send message:", err);
      setError(err.message || "Message could not be sent.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-poppins sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <Headset size={21} />
            <span className="text-sm font-semibold">
              EASYBANK SUPPORT
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Customer Support
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We're here to help with your banking questions.
          </p>
        </div>

        {/* Chat container */}
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[300px_1fr]">

          {/* Sidebar */}
          <aside className="hidden border-r border-slate-100 bg-slate-50/70 p-6 lg:block">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <MessageCircle size={23} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Help Centre
                </h2>
                <p className="text-xs text-slate-500">
                  EASYBANK assistance
                </p>
              </div>
            </div>

            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Support topics
            </h3>

            <div className="space-y-2">
              {[
                "Account issues",
                "Transfers and payments",
                "Cards",
                "Savings",
                "Security",
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() =>
                    setMessage(`I need help with ${topic.toLowerCase()}. `)
                  }
                  className="w-full rounded-xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <ShieldCheck
                size={24}
                className="mb-3 text-blue-600"
              />

              <h3 className="text-sm font-semibold text-slate-900">
                Stay protected
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Never share your password, PIN, or verification codes
                with anyone claiming to be support.
              </p>
            </div>
          </aside>

          {/* Chat area */}
          <section className="flex min-h-[650px] flex-col">

            {/* Chat header */}
            <header className="flex items-center justify-between border-b border-slate-100 px-4 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  aria-label="Back"
                  onClick={() => window.history.back()}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                  <ArrowLeft size={19} />
                </button>

                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <Headset size={24} />

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    EASYBANK Support
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Support interface
                  </p>
                </div>
              </div>

              <button
                aria-label="More options"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <MoreVertical size={21} />
              </button>
            </header>

            {/* Messages */}
            {/* Messages */}
<div className="flex-1 space-y-5 overflow-y-auto bg-white p-4 sm:p-6">
  <div className="py-3 text-center">
    <span className="rounded-full bg-slate-100 px-4 py-2 text-xs text-slate-500">
      Conversation started
    </span>
  </div>

  {loading && (
    <p className="py-6 text-center text-sm text-slate-500">
      Connecting to EASYBANK Support...
    </p>
  )}

  {error && (
    <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
      {error}
    </div>
  )}

  {!loading && !error && messages.length === 0 && (
    <p className="py-6 text-center text-sm text-slate-500">
      No messages yet. Send a message to start your conversation.
    </p>
  )}

  {messages.map((item) => {
    const isCustomer = item.senderRole === "customer";

    return (
      <div
        key={item.id}
        className={`flex ${
          isCustomer ? "justify-end" : "justify-start"
        }`}
      >
        <div className="max-w-[85%] sm:max-w-[75%]">
          <div
            className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
              isCustomer
                ? "rounded-br-sm bg-blue-600 text-white"
                : "rounded-bl-sm bg-slate-100 text-slate-700"
            }`}
          >
            {item.text}
          </div>

          <div
            className={`mt-2 flex items-center gap-1 text-[11px] text-slate-400 ${
              isCustomer ? "justify-end" : "justify-start"
            }`}
          >
            <span>
              {item.createdAt?.toDate
                ? item.createdAt.toDate().toLocaleString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Sending..."}
            </span>

            {isCustomer && (
              <CheckCheck size={14} className="text-blue-500" />
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>

            {/* Message input */}
           <form onSubmit={handleSendMessage} className="border-t border-slate-100 p-4">
  <div className="flex items-center gap-3">
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message..."
      className="w-full resize-none rounded-xl border border-slate-200 p-3 outline-none focus:border-blue-500"
    />

    <button
      type="submit"
      disabled={!message.trim() || !chatId || sending}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {sending ? "Sending..." : "Send"}
    </button>
  </div>
</form>
          </section>
        </div>
      </div>
    </div>
  );
}