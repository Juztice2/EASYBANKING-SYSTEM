import { TrendingDown } from "lucide-react";

export default function SpendingChart() {
  const bars = [35, 50, 42, 68, 55, 82, 63];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-poppins">
            Monthly Spending
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            October 2026
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <TrendingDown size={19} />
        </div>
      </div>

      <div className="mt-7">
        <p className="text-3xl font-bold text-slate-900">
          $184,500
        </p>

        <p className="text-xs text-emerald-600 font-medium mt-2">
          8.4% less than last month
        </p>
      </div>

      <div className="flex items-end gap-3 h-36 mt-8">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 h-full flex items-end"
          >
            <div
              style={{ height: `${height}%` }}
              className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs text-slate-400 mt-3">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}