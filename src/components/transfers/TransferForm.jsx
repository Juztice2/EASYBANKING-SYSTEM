import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  UserRound,
  Wallet,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const banks = [
  "Access Bank",
  "First Bank",
  "GTBank",
  "Kuda Bank",
  "Moniepoint",
  "OPay",
  "UBA",
  "Zenith Bank",
];
export default function TransferForm({ onContinue }) {
  const [formData, setFormData] = useState({
    recipientName: "",
    accountNumber: "",
    bank: "",
    amount: "",
    narration: "",
  });

  const [errors, setErrors] = useState({});
  const {details} = useAuth()
  
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Enter the recipient's name.";
    }

    if (!/^\d{10}$/.test(formData.accountNumber)) {
      newErrors.accountNumber =
        "Enter a valid 10-digit account number.";
    }

    if (!formData.bank) {
      newErrors.bank = "Select a bank.";
    }

    const amount = Number(formData.amount);
    const accountBalance = Number(details?.account ?? 0);

    if (!formData.amount || !Number.isFinite(amount) || amount <= 0) {
      newErrors.amount = "Enter a valid transfer amount.";
    } else if (amount < 10) {
      newErrors.amount = "The minimum  transfer is $10.";
    } else if (amount > 500000000000) {
      newErrors.amount = "The maximum  transfer is $900,000,000,000.";
    }
     else if (amount > details?.account) {
      newErrors.amount = "Insufficient Funds.Try lower amount";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    onContinue({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  function inputClass(name) {
    return `
      w-full rounded-xl border px-4 py-3.5
      text-sm text-slate-800 outline-none transition
      placeholder:text-slate-400
      ${
        errors[name]
          ? "border-red-400 focus:ring-2 focus:ring-red-100"
          : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      }
    `;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipient */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserRound size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Recipient details
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Who are you sending money to?
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="recipientName"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Account name
            </label>

            <input
              id="recipientName"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              placeholder="Enter recipient's account name"
              className={inputClass("recipientName")}
            />

            {errors.recipientName && (
              <p className="text-red-500 text-xs mt-2">
                {errors.recipientName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Account number
            </label>

            <input
              id="accountNumber"
              name="accountNumber"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              value={formData.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                handleChange({
                  target: {
                    name: "accountNumber",
                    value,
                  },
                });
              }}
              placeholder="0123456789"
              className={inputClass("accountNumber")}
            />

            {errors.accountNumber && (
              <p className="text-red-500 text-xs mt-2">
                {errors.accountNumber}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="bank"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Recipient's bank
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />

              <select
                id="bank"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className={`${inputClass("bank")} appearance-none pl-11 pr-10`}
              >
                <option value="">Select a bank</option>

                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>

            {errors.bank && (
              <p className="text-red-500 text-xs mt-2">
                {errors.bank}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Amount */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wallet size={20} />
          </div>

          <div>
            <h3 className="font-bold text-slate-900">
              Transfer amount
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Enter the amount for this transfer.
            </p>
            <p className="text-xs text-green-500 mt-1">
             Acc.Bal: {details?.account} 
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Amount (NGN)
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">
              $
            </span>

            <input
              id="amount"
              name="amount"
              type="number"
              min="100"
              max="5000000000000000000000"
              step="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className={`${inputClass("amount")} pl-10 text-lg font-semibold`}
            />
          </div>

          {errors.amount && (
            <p className="text-red-500 text-xs mt-2">
              {errors.amount}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="narration"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Description <span className="text-slate-400">(optional)</span>
          </label>

          <input
            id="narration"
            name="narration"
            maxLength={100}
            value={formData.narration}
            onChange={handleChange}
            placeholder="What's this transfer for?"
            className={inputClass("narration")}
          />
        </div>

        <div className="flex gap-3 rounded-xl bg-blue-50 border border-blue-100 p-4 mt-5">
          <CircleHelp
            size={19}
            className="text-blue-600 shrink-0 mt-0.5"
          />

          <p className="text-xs leading-relaxed text-blue-800">
            This is a transfer.  Real funds will be moved,
            and the entered recipient details will  be verified by a bank.
          </p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
      >
        Review transfer
        <ArrowRight size={19} />
      </button>
    </form>
  );
}