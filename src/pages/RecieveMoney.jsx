import { useState } from "react";
import {
  ArrowDownLeft,
  Building2,
  Check,
  Copy,
  CreditCard,
  Info,
  ShieldCheck,
  UserRound,
  Wallet,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ReceiveMoney() {
  const { details, loading } = useAuth();
  const [copied, setCopied] = useState(false);

  // Replace this with your real demo account-number field
  // if your Firestore document uses a different property.
 
  const bankName = "EASYBANK";

  const copyToClipboard = async (value) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(value);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy details:", error);
      alert("Unable to copy automatically. Please copy the details manually.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-poppins text-sm text-gray-500">
          Loading account details...
        </p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
        <Info className="mx-auto mb-3 text-red-500" size={32} />
        <h2 className="font-poppins font-semibold text-gray-800">
          Account details unavailable
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We couldn't load your account details. Please refresh the page or
          sign in again.
        </p>
      </div>
    );
  }

  const fullName =
    `${details.Firstname || ""} ${details.Lastname || ""}`.trim() ||
    "Account Holder";

  const balance = Number(details.account ?? 0);
  const accountNumber = details?.accNo
  const accountDetails = [
    {
      label: "Account Name",
      value: fullName,
      icon: UserRound,
    },
    {
      label: "Bank Name",
      value: bankName,
      icon: Building2,
    },
    {
      label: "Account Number",
      value: accountNumber || "Not available",
      icon: CreditCard,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 font-poppins sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
          <ArrowDownLeft size={25} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Receive Money
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          Share your account details with someone who wants to send you money.
        </p>
      </div>

      {/* Balance card */}
      <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-500 p-6 text-white shadow-lg sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full border-[28px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-green-50">
              <Wallet size={18} />
              <span>Available  balance</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              $
              {balance.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>

            <p className="mt-3 text-xs text-green-50">
              Updated account balance · Real funds
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-3">
            <ArrowDownLeft size={27} />
          </div>
        </div>

        <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/20 pt-5">
          <div>
            <p className="text-xs text-green-100">Account holder</p>
            <p className="mt-1 font-semibold">{fullName}</p>
          </div>

          <ShieldCheck size={25} className="text-green-100" />
        </div>
      </section>

      {/* Account details */}
      <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            Your account details
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Share these details with the sender.
          </p>
        </div>

        <div className="space-y-3">
          {accountDetails.map((item) => {
            const Icon = item.icon;
            const isAccountNumber = item.label === "Account Number";
            const canCopy =
              item.value !== "Not available" && Boolean(item.value);
            const isCopied = copied === item.value;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p
                      className={`mt-1 break-words font-semibold text-gray-800 ${
                        isAccountNumber
                          ? "tracking-wider"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(item.value)}
                  disabled={!canCopy}
                  aria-label={`Copy ${item.label}`}
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isCopied ? (
                    <>
                      <Check size={16} />
                      <span className="hidden sm:inline">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() =>
            copyToClipboard(
              `Account Name: ${fullName}\nBank Name: ${bankName}\nAccount Number: ${accountNumber || "Not available"}`
            )
          }
          disabled={!accountNumber}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-4 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied?.startsWith?.("Account Name:") ? (
            <>
              <Check size={18} />
              Account details copied
            </>
          ) : (
            <>
              <Copy size={18} />
              Copy all account details
            </>
          )}
        </button>
      </section>

      {/* Information notice */}
      <section className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
        <Info className="mt-0.5 shrink-0 text-blue-600" size={20} />

        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            About receiving money
          </h3>

          <p className="mt-1 text-sm leading-6 text-blue-800">
            This page is for real demonstration purposes. Copying your account
            details will initiate a payment, and this action receive
            real bank transfers.
          </p>
        </div>
      </section>
    </main>
  );
}

