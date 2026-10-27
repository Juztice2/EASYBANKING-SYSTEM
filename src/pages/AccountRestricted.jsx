import { useNavigate } from "react-router-dom";
import { ShieldAlert, Headset, ArrowLeft, LockKeyhole } from "lucide-react";

export default function AccountRestricted() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 font-poppins">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
        
        {/* Blue header */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-500 px-6 py-10 text-center text-white">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-8 ring-white/10">
            <ShieldAlert size={42} strokeWidth={1.7} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Account Restricted
          </h1>

          <p className="mt-3 text-sm leading-6 text-blue-50 sm:text-base">
            Access to your EASYBANK account has been temporarily restricted.
          </p>
        </div>

        {/* Page content */}
        <div className="px-6 py-8 text-center sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LockKeyhole size={27} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            Account restricted. Contact support.
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            You currently cannot access your banking services. If you believe
            this restriction is a mistake or need assistance, please contact
            our customer support team.
          </p>

          {/* Customer support button */}
          <button
            onClick={() => navigate("/customer-support")}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <Headset size={22} />
            <span>Contact Customer Support</span>
          </button>

          <p className="mt-4 text-xs text-slate-400">
            Our support team is available to assist you.
          </p>

          <div className="mt-7 border-t border-slate-100 pt-5">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Return to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-700">
            EASYBANK
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Secure banking. Reliable support.
          </p>
        </div>
      </div>
    </div>
  );
}

