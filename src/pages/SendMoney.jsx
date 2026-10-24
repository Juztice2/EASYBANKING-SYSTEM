import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRightLeft,
  ShieldCheck,
} from "lucide-react";

import TransferForm from "../components/transfers/TransferForm";
import TransferReview from "../components/transfers/TransferReview";
import TransferSuccess from "../components/transfers/TransferSuccess";

export default function SendMoney() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [transfer, setTransfer] = useState(null);
  const [reference, setReference] = useState("");

  function handleContinue(data) {
    setTransfer(data);
    setStep(2);
  }

  function handleConfirm() {
    // Generate a demo reference only.
    // This does not initiate a real bank transfer.
    const demoReference =
      `DEMO-${Date.now().toString(36).toUpperCase()}`;

    setReference(demoReference);
    setStep(3);
  }

  function handleNewTransfer() {
    setTransfer(null);
    setReference("");
    setStep(1);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={19} />
            <span className="text-sm font-medium">
              Dashboard
            </span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              E
            </div>

            <span className="font-bold text-slate-900 tracking-tight">
              EASYSAVINGS
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-14">
        {/* Page title */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <ArrowRightLeft size={27} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-5">
            Send money
          </h1>

          <p className="text-slate-500 mt-3 leading-relaxed">
            A simple method of a secure, step-by-step transfer
            experience.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center">
            {[
              { number: 1, label: "Recipient" },
              { number: 2, label: "Review" },
              { number: 3, label: "Complete" },
            ].map((item, index) => (
              <div
                key={item.number}
                className={`flex items-center ${
                  index < 2 ? "flex-1" : ""
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`
                      w-9 h-9 rounded-full flex items-center justify-center
                      text-sm font-bold transition
                      ${
                        step >= item.number
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-slate-200 text-slate-400"
                      }
                    `}
                  >
                    {item.number}
                  </div>

                  <span
                    className={`text-xs font-medium ${
                      step >= item.number
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {index < 2 && (
                  <div
                    className={`h-1 flex-1 mx-3 rounded-full mb-6 ${
                      step > item.number
                        ? "bg-blue-600"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 md:p-10">
            {step === 1 && (
              <TransferForm onContinue={handleContinue} />
            )}

            {step === 2 && transfer && (
              <TransferReview
                transfer={transfer}
                onBack={() => setStep(1)}
                onConfirm={handleConfirm}
              />
            )}

            {step === 3 && transfer && (
              <TransferSuccess
                transfer={transfer}
                reference={reference}
                onNewTransfer={handleNewTransfer}
                onDashboard={() => navigate("/dashboard")}
              />
            )}
          </div>

          <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-6">
            <ShieldCheck size={16} />
            <span>Demo environment — no real transactions</span>
          </div>
        </div>
      </main>
    </div>
  );
}