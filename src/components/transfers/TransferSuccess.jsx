import {
  Check,
  ArrowRight,
  Home,
  ReceiptText,
} from "lucide-react";

export default function TransferSuccess({
  transfer,
  reference,
  onNewTransfer,
  onDashboard,
}) {
  const formattedAmount = Number(transfer.amount).toLocaleString(
    "en-NG",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );

  return (
    <div className="text-center">
      <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <Check size={38} strokeWidth={2.5} />
      </div>

      <p className="text-sm font-semibold text-emerald-600 mt-6">
        Demo completed
      </p>

      <h2 className="text-3xl font-bold text-slate-900 mt-2">
        Transfer simulated!
      </h2>

      <p className="text-slate-500 mt-3 leading-relaxed">
        Your demo transfer has been recorded on this screen.
        No real money was sent.
      </p>

      <div className="rounded-2xl border border-slate-200 mt-8 p-6 text-left">
        <div className="text-center border-b border-slate-100 pb-5">
          <p className="text-sm text-slate-500">
            Simulated transfer amount
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            ₦{formattedAmount}
          </p>
        </div>

        <div className="space-y-4 pt-5">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Recipient
            </span>

            <span className="font-semibold text-slate-800 text-right">
              {transfer.recipientName}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Bank
            </span>

            <span className="font-semibold text-slate-800 text-right">
              {transfer.bank}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Account number
            </span>

            <span className="font-semibold text-slate-800">
              {transfer.accountNumber}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Demo reference
            </span>

            <span className="font-mono text-xs text-slate-700 break-all text-right">
              {reference}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-slate-500">
              Status
            </span>

            <span className="font-semibold text-emerald-600">
              Simulated
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-7">
        <button
          type="button"
          onClick={onNewTransfer}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition"
        >
          <ArrowRight size={18} />
          Make another transfer
        </button>

        <button
          type="button"
          onClick={onDashboard}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-4 font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <Home size={18} />
          Back to dashboard
        </button>
      </div>
    </div>
  );
}