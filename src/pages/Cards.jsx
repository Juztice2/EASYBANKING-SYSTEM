
import { useState } from "react";
import {
  CreditCard,
  Eye,
  EyeOff,
  Snowflake,
  Settings2,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Globe,
  ChevronRight,
  LockKeyhole,
  Wifi,
} from "lucide-react";

export default function Cards() {
  const [showNumber, setShowNumber] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const cardNumber = "4829 1047 6253 8106";

  const transactions = [
    {
      name: "Shopping",
      description: "Online purchase",
      amount: "₦25,000.00",
      date: "Today",
      icon: ShoppingBag,
    },
    {
      name: "International payment",
      description: "Online subscription",
      amount: "₦8,500.00",
      date: "Yesterday",
      icon: Globe,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              EASYBANK / CARDS
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Cards
            </h1>

            <p className="mt-2 text-slate-500">
              Manage your cards and explore your card activity.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            <Plus size={19} />
            Add a card
          </button>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Card Display */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Your card</h2>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Demo card
              </span>
            </div>

            {/* Bank Card */}
            <div
              className={`relative mx-auto aspect-[1.586/1] w-full max-w-[520px] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 p-6 text-white shadow-2xl shadow-blue-950/20 transition sm:p-8 ${
                isFrozen ? "grayscale" : ""
              }`}
            >
              {/* Decorative shapes */}
              <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />

              <div className="pointer-events-none absolute -bottom-28 right-16 h-64 w-64 rounded-full bg-sky-400/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium tracking-[0.25em] text-blue-200">
                    EASYBANK
                  </p>

                  <p className="mt-1 text-lg font-bold tracking-wide sm:text-xl">
                    Premium
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="h-7 w-7 rounded-full bg-red-400/90" />
                  <span className="-ml-3 h-7 w-7 rounded-full bg-yellow-300/90" />
                </div>
              </div>

              <div className="relative mt-5 flex items-center gap-3 sm:mt-8">
                <div className="flex h-10 w-12 items-center justify-center rounded-lg border border-white/30 bg-gradient-to-br from-yellow-100 to-yellow-500">
                  <div className="grid h-6 w-8 grid-cols-2 gap-0.5">
                    <span className="rounded-sm border border-yellow-700/40" />
                    <span className="rounded-sm border border-yellow-700/40" />
                    <span className="rounded-sm border border-yellow-700/40" />
                    <span className="rounded-sm border border-yellow-700/40" />
                  </div>
                </div>

                <Wifi size={25} className="rotate-90 text-white/80" />
              </div>

              <div className="relative mt-5 sm:mt-7">
                <p className="break-words font-mono text-lg tracking-[0.12em] sm:text-2xl sm:tracking-[0.18em]">
                  {showNumber ? cardNumber : "•••• •••• •••• 8106"}
                </p>
              </div>

              <div className="relative mt-5 flex items-end justify-between sm:mt-7">
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-blue-200 sm:text-[10px]">
                    Cardholder
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold uppercase tracking-wider sm:text-sm">
                    EASYBANK DEMO USER
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[9px] uppercase tracking-wider text-blue-200 sm:text-[10px]">
                    Expires
                  </p>

                  <p className="mt-1 text-sm font-semibold">12/29</p>
                </div>
              </div>

              {isFrozen && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/65 backdrop-blur-[2px]">
                  <Snowflake size={36} />
                  <p className="mt-2 font-bold tracking-widest">CARD FROZEN</p>
                  <p className="mt-1 text-xs text-blue-100">
                    Demo preview
                  </p>
                </div>
              )}
            </div>

            <p className="mx-auto mt-3 max-w-[520px] text-xs leading-5 text-slate-400">
              Illustrative card design only. The displayed card details are
              fictional and cannot be used for payments.
            </p>

            {/* Card Controls */}
            <div className="mx-auto mt-6 grid max-w-[520px] grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setShowNumber(!showNumber)}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                {showNumber ? <EyeOff size={21} /> : <Eye size={21} />}

                <span className="text-xs font-semibold sm:text-sm">
                  {showNumber ? "Hide number" : "Show number"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsFrozen(!isFrozen)}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition ${
                  isFrozen
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <Snowflake size={21} />

                <span className="text-xs font-semibold sm:text-sm">
                  {isFrozen ? "Unfreeze" : "Freeze card"}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  alert("Demo only: card settings are not connected.")
                }
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <Settings2 size={21} />

                <span className="text-xs font-semibold sm:text-sm">
                  Settings
                </span>
              </button>
            </div>
          </section>

          {/* Card Information */}
          <section className="space-y-6">
            {/* Spending Summary */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Monthly spending
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                    ₦33,500.00
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <CreditCard size={25} />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Demo spending limit</span>
                  <span className="font-semibold text-slate-800">
                    ₦200,000
                  </span>
                </div>

                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[17%] rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  Sample figures for interface demonstration only.
                </p>
              </div>
            </div>

            {/* Card Details */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h2 className="text-lg font-bold text-slate-900">
                Card information
              </h2>

              <div className="mt-5 divide-y divide-slate-100">
                <div className="flex items-center justify-between gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Security
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Demo card controls
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Preview
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                      <LockKeyhole size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        Card status
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {isFrozen ? "Frozen in this preview" : "Active in this preview"}
                      </p>
                    </div>
                  </div>

                  <ChevronRight size={19} className="text-slate-400" />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Recent Activity */}
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Recent card activity
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Example transactions for the interface preview.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                alert("Demo only: no real transaction history is available.")
              }
              className="text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              View all
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {transactions.map((transaction, index) => {
              const Icon = transaction.icon;

              return (
                <div
                  key={transaction.name}
                  className={`flex items-center justify-between gap-4 p-5 sm:p-6 ${
                    index !== transactions.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-bold text-slate-800">
                        {transaction.name}
                      </p>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {transaction.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="font-bold text-slate-900">
                      {transaction.amount}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {transaction.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Demo Notice */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <ShieldCheck
            size={21}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <p className="text-sm leading-6 text-blue-900">
            <strong>Demo mode:</strong> This page uses fictional card details
            and sample activity. Card freezing, spending figures, and settings
            are for UI demonstration only and do not affect real financial
            accounts.
          </p>
        </div>
      </div>
    </main>
  );
}

