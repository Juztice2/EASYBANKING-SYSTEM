import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
export default function TransferReview({
  transfer,
  onBack,
  onConfirm,
}) {
  const formattedAmount = Number(transfer.amount).toLocaleString(
    "en-NG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
  const [loading, setLoading] = useState(false);
const { details } = useAuth();

const amount = Number(transfer.amount);
const currentBalance = Number(details?.account ?? 0);

const balance = currentBalance - amount;

async function handleConfirm() {
  if (loading) return;

  if (!details?.id) {
    alert("Account document ID was not found.");
    return;
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    alert("Please enter a valid transfer amount.");
    return;
  }

  if (amount > currentBalance) {
    alert("Insufficient funds.");
    return;
  }

  setLoading(true);

  try {
    const accountRef = doc(db, "Account", details.id);

    await updateDoc(accountRef, {
      account: currentBalance - amount
    });

    // Continue to the success screen only after the update succeeds.
    await onConfirm();
  } catch (error) {
    console.error("Demo transfer error:", error);
    alert("Unable to process the demo transfer.");
  } finally {
    setLoading(false);
  }
}
  return (
    <div>
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <ArrowRight size={28} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mt-5">
          Review transfer
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Check these details before confirming the demo.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-8 text-center">
        <p className="text-sm text-slate-500">
          Transfer amount
        </p>

        <h3 className="text-3xl font-bold text-slate-900 mt-2">
          ₦{formattedAmount}
        </h3>

        <p className="text-xs text-slate-400 mt-2">
          Demonstration only · No real funds transferred
        </p>
      </div>

      <div className="mt-6 border border-slate-200 rounded-2xl p-5 space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserRound size={19} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400">
              Recipient
            </p>

            <p className="font-semibold text-slate-900 mt-1 break-words">
              {transfer.recipientName}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              {transfer.accountNumber}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 size={19} />
          </div>

          <div>
            <p className="text-xs text-slate-400">
              Recipient bank
            </p>

            <p className="font-semibold text-slate-900 mt-1">
              {transfer.bank}
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Transfer fee
          </p>

          <p className="font-semibold text-slate-900">
            ₦0.00
          </p>
        </div>

        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-slate-500">
            Description
          </p>

          <p className="text-sm font-medium text-slate-800 text-right break-words">
            {transfer.narration || "No description"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 mt-5 rounded-xl bg-amber-50 border border-amber-100 p-4">
        <ShieldCheck
          size={20}
          className="text-amber-600 shrink-0"
        />

        <p className="text-xs text-amber-800 leading-relaxed">
          Confirm only if the displayed details are correct. This screen
          simulates confirmation and does not contact a bank or initiate
          a real transaction.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-7">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <ArrowLeft size={17} />
          Edit details
        </button>

       <button
  type="button"
  onClick={handleConfirm}
  disabled={loading}
  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Processing..." : "Confirm demo"}

  {!loading && <CheckCircle2 size={18} />}
</button>
      </div>
    </div>
  );
}