import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    {
      title: "Send Money",
      icon: ArrowUpRight,
    },
    {
      title: "Receive Money",
      icon: ArrowDownLeft,
    },
    {
      title: "My Cards",
      icon: CreditCard,
    },
    {
      title: "Pay Bills",
      icon: Receipt,
    },
  ];

  return (
    <div className="font-poppins">
      <h2 className="text-lg font-bold text-slate-900 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
           <button
           key={action.title}
            onClick={() => {
              if (action.title === "Send Money") {
             navigate("/send-money");
        }else if (action.title === "Receive Money") {
             navigate("/receive-money");
        }else if (action.title === "My Cards") {
             navigate("/my-cards");
        }
  }}
  className="bg-white border border-slate-200 rounded-2xl p-5 text-left hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
>
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon size={21} />
              </div>

              <p className="text-sm font-semibold text-slate-800 mt-4">
                {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}