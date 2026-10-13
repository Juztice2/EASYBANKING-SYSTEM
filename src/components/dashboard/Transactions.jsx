import {
  ArrowDownLeft,
  ArrowUpRight,
  Zap,
  ShoppingBag,
} from "lucide-react";

export default function Transactions() {
  const transactions = [
    {
      title: "Salary",
      date: "Today, 9:42 AM",
      amount: "+₦450,000",
      type: "income",
      icon: ArrowDownLeft,
    },
    {
      title: "Transfer to John",
      date: "Yesterday, 4:15 PM",
      amount: "-₦50,000",
      type: "expense",
      icon: ArrowUpRight,
    },
    {
      title: "Electricity Bill",
      date: "Oct 5, 11:20 AM",
      amount: "-₦24,500",
      type: "expense",
      icon: Zap,
    },
    {
      title: "Shopping",
      date: "Oct 4, 3:40 PM",
      amount: "-₦18,700",
      type: "expense",
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Recent Transactions
        </h2>

        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
          View all
        </button>
      </div>

      <div className="space-y-2">
        {transactions.map((transaction) => {
          const Icon = transaction.icon;

          return (
            <div
              key={transaction.title}
              className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center
                    ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <Icon size={19} />
                </div>

                <div>
                  <p className="font-semibold text-sm text-slate-800">
                    {transaction.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {transaction.date}
                  </p>
                </div>
              </div>

              <p
                className={`
                  text-sm font-bold
                  ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-slate-800"
                  }
                `}
              >
                {transaction.amount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}