import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(true);
  const { details, loading, error} = useAuth();
  const [msg, setMsg] = useState('')
    const formattedAmount = Number(details?.account).toLocaleString(
      "en-NG",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  
  try {
   if (loading) {
    return <p>Loading account details...</p>;
  } 
     if (error) {
    return <p>{ error}</p>;
  }
  } catch (error) {
  setMsg(error.message)
  }
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#061936] via-[#0b2d68] to-[#1557c7] p-7 text-white shadow-xl shadow-blue-900/10">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-blue-100 text-sm">
            Total Balance
          </p>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-blue-100 hover:text-white transition"
          >
            {showBalance ? <Eye size={19} /> : <EyeOff size={19} />}
          </button>
        </div>

        <div className="mt-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-poppins">
           $ {showBalance ? formattedAmount : "••••••••"}
          </h2>
        </div>

        <div className="flex items-center gap-2 mt-3 text-sm text-blue-100">
          <TrendingUp size={16} />

          <span>
            +12.8% this month
          </span>
        </div>

        <div className="flex justify-between items-end mt-10">
          <div>
            <p className="text-xs text-blue-200">
              Account Number
            </p>

            <p className="font-medium mt-1">
              {details?.accNo}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-blue-200">
              Account Type
            </p>

            <p className="font-medium mt-1">
              Premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}