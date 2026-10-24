import { useState } from "react";
import {
  CreditCard,
  Eye,
  EyeOff,
  Copy,
  Check,
  Plus,
  Snowflake,
  ShieldCheck,
  Wifi,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  LockKeyhole,
  Info,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function MyCards() {
  const { details, loading } = useAuth();

  const [showNumber, setShowNumber] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const cardholder =
    `${details?.Firstname || ""} ${details?.Lastname || ""}`.trim() ||
    "ACCOUNT HOLDER";

  // Demo card details only.
  // These are not real payment card credentials.
  const demoCardNumber = "4829 1047 6253 8106";
  const expiryDate = "12/29";
  const cardType = "VISA";

  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(demoCardNumber);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy card number:", error);
      setNotice("Unable to copy automatically. Please try again.");
    }
  };

  const handleAddCard = () => {
    setNotice(
      "Adding a card is a demo feature. No real payment card has been created."
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-poppins text-sm text-gray-500">
          Loading your cards...
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl bg-gray-50/50 px-4 py-6 font-poppins sm:px-6 lg:px-8">

      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <CreditCard size={25} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Cards
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your cards and card settings.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCard}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
        >
          <Plus size={19} />
          Add New Card
        </button>
      </div>

      {/* NOTICE */}
      {notice && (
        <div
          role="status"
          className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800"
        >
          <div className="flex items-start gap-2">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>{notice}</p>
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="font-semibold"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="space-y-6 lg:col-span-2">

          {/* CARD SECTION */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Your Cards
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your virtual payment card
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                1 Debit Card
              </span>
            </div>

            {/* CARD DESIGN */}
            <div
              className={`relative mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl p-6 text-white shadow-xl transition-all duration-300 sm:p-8 ${
                frozen
                  ? "bg-gradient-to-br from-slate-700 via-slate-800 to-gray-950"
                  : "bg-gradient-to-br from-blue-800 via-green-700 to-blue-500"
              }`}
            >
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />

              <div className="pointer-events-none absolute -bottom-28 right-20 h-64 w-64 rounded-full bg-white/5" />

              <div className="relative z-10">

                {/* CARD TOP */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                        <Wallet size={21} />
                      </div>

                      <span className="text-lg font-bold tracking-wide">
                        EASYBANK
                      </span>
                    </div>

                    <p className="mt-2 text-xs tracking-widest text-white/70">
                      VIRTUAL DEBIT CARD
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wifi
                      size={25}
                      className="rotate-90 text-white/90"
                    />

                    <button
                      type="button"
                      onClick={() => setShowMenu(!showMenu)}
                      aria-label="Card options"
                      className="rounded-lg p-2 transition hover:bg-white/10"
                    >
                      <MoreHorizontal size={24} />
                    </button>
                  </div>
                </div>

                {/* CARD CHIP */}
                <div className="my-8 flex items-center gap-4">
                  <div className="relative flex h-10 w-12 items-center justify-center overflow-hidden rounded-lg border border-white/40 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500">
                    <div className="absolute h-full w-px bg-yellow-700/40" />
                    <div className="absolute h-px w-full bg-yellow-700/40" />
                    <div className="h-6 w-8 rounded border border-yellow-800/40" />
                  </div>

                  <div className="rounded-lg border border-white/30 bg-white/10 px-3 py-1.5">
                    <span className="text-[10px] tracking-wider text-white/80">
                      DEMO ONLY
                    </span>
                  </div>
                </div>

                {/* CARD NUMBER */}
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold tracking-[0.16em] sm:text-2xl">
                      {showNumber
                        ? demoCardNumber
                        : `•••• •••• •••• ${demoCardNumber.slice(-4)}`}
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowNumber(!showNumber)}
                      aria-label={
                        showNumber
                          ? "Hide  card number"
                          : "Show  card number"
                      }
                      className="rounded-lg p-1.5 transition hover:bg-white/10"
                    >
                      {showNumber ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* CARD BOTTOM */}
                <div className="mt-8 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/70">
                      Card Holder
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold uppercase tracking-wider">
                      {cardholder}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <p className="text-[10px] uppercase tracking-widest text-white/70">
                      Expires
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {expiryDate}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xl font-black italic tracking-wider">
                      {cardType}
                    </p>
                  </div>
                </div>

                {/* FROZEN OVERLAY */}
                {frozen && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <Snowflake size={38} />
                    <p className="mt-3 text-lg font-bold">
                      Card Frozen
                    </p>
                    <p className="mt-1 text-xs text-white/80">
                      Demo interface only
                    </p>
                  </div>
                )}
              </div>

              {/* CARD MENU */}
              {showMenu && (
                <div className="absolute right-5 top-16 z-30 w-48 rounded-xl border border-gray-100 bg-white p-2 text-gray-700 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNumber(!showNumber);
                      setShowMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-gray-100"
                  >
                    {showNumber ? "Hide card number" : "Show card number"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      copyCardNumber();
                      setShowMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-gray-100"
                  >
                    Copy card number
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFrozen(!frozen);
                      setShowMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm hover:bg-gray-100"
                  >
                    {frozen ? "Unfreeze card" : "Freeze card"}
                  </button>
                </div>
              )}
            </div>

            {/* CARD ACTIONS */}
            <div className="mx-auto mt-5 grid max-w-[560px] grid-cols-2 gap-3 sm:grid-cols-3">

              <button
                type="button"
                onClick={copyCardNumber}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Number"}
              </button>

              <button
                type="button"
                onClick={() => setFrozen(!frozen)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  frozen
                    ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                    : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                }`}
              >
                {frozen ? (
                  <ShieldCheck size={18} />
                ) : (
                  <Snowflake size={18} />
                )}

                {frozen ? "Unfreeze" : "Freeze Card"}
              </button>

              <div className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-3 text-xs text-gray-500 sm:col-span-1">
                <ShieldCheck size={16} className="text-green-600" />
                Real card
              </div>
            </div>
          </section>

          {/* CARD DETAILS */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Card Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Details for your virtual card.
            </p>

            <div className="mt-6 divide-y divide-gray-100">

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Card Type
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Virtual debit
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Card
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Card Status
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {frozen
                        ? "Frozen in this Card"
                        : "Active in this Card"}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    frozen
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {frozen ? "Frozen" : "Active"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <LockKeyhole size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Security
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                       Real card credentials stored
                    </p>
                  </div>
                </div>

                <ShieldCheck size={20} className="text-green-600" />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-6">

          {/* CARD SETTINGS */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Card Settings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your card.
            </p>

            <div className="mt-5 space-y-3">

              <button
                type="button"
                onClick={() => {
                  setFrozen(!frozen);
                  setNotice(
                    frozen
                      ? "Your card has been unfrozen."
                      : "Your card has been frozen."
                  );
                }}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Snowflake size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {frozen ? "Unfreeze Card" : "Freeze Card"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {frozen
                        ? "Return to active state"
                        : "Pause the card"}
                    </p>
                  </div>
                </div>

                <span
                  className={`h-6 w-11 rounded-full p-1 transition ${
                    frozen ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-4 w-4 rounded-full bg-white transition-transform ${
                      frozen ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>

              <button
                type="button"
                onClick={handleAddCard}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-100 p-4 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <Plus size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Add New Card
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Card feature
                  </p>
                </div>
              </button>
            </div>
          </section>

          {/* LIMITS CARD */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <Wallet size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  Card Limits
                </h2>

                <p className="text-xs text-gray-500">
                  Illustrative values only
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-5">

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600">
                    Daily spending
                  </span>

                  <span className="text-sm font-bold text-gray-900">
                    $500,000
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[35%] rounded-full bg-green-600" />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Illustrative progress
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600">
                    Online spending
                  </span>

                  <span className="text-sm font-bold text-gray-900">
                    $200,000
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full w-[55%] rounded-full bg-blue-500" />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Illustrative progress
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-3">
              <div className="flex items-start gap-2">
                <Info
                  size={17}
                  className="mt-0.5 shrink-0 text-gray-500"
                />

                <p className="text-xs leading-5 text-gray-500">
                  These limits are sample values for the interface. They are
                  not enforced spending limits and do not authorize payments.
                </p>
              </div>
            </div>
          </section>

          {/* QUICK ACTIVITY */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Quick Actions
            </h2>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => setNotice("Demo card details are displayed above.")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <ArrowUpRight size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Card details
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    View your card
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setNotice("No real card transactions are available in this demo.")}
                className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                  <ArrowDownLeft size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Card activity
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Card transaction information
                  </p>
                </div>
              </button>
            </div>
          </section>
        </aside>
      </div>

      {/* FOOTER NOTICE */}
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
        <Info size={19} className="mt-0.5 shrink-0 text-blue-600" />

        <p className="text-xs leading-6 text-blue-800 sm:text-sm">
          <strong>Real time Demonstration only:</strong> This page uses sample card
          details. Freezing, copying, and other controls changes the local
          interface. Real card is issued, and  real payment can be made.
        </p>
      </div>
    </main>
  );
}