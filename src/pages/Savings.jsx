import { useState } from "react";
import {
  PiggyBank,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Target,
  TrendingUp,
  CalendarDays,
  ShieldCheck,
  Wallet,
  ChevronRight,
  Sparkles,
  Clock,
  CircleDollarSign,
} from "lucide-react";

export default function Savings() {
  const [activeTab, setActiveTab] = useState("All");

  // Sample data for demonstration only
  const savings = {
    balance: 850000,
    interestRate: 8.5,
    totalInterest: 12500,
    monthlyTarget: 100000,
  };

  const goals = [
    {
      id: 1,
      name: "New Laptop",
      description: "Save for a new laptop",
      saved: 180000,
      target: 300000,
      icon: "💻",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Emergency Fund",
      description: "Build a financial safety net",
      saved: 350000,
      target: 500000,
      icon: "🛡️",
      color: "bg-emerald-500",
    },
    {
      id: 3,
      name: "Vacation",
      description: "Your next adventure awaits",
      saved: 75000,
      target: 200000,
      icon: "✈️",
      color: "bg-purple-500",
    },
  ];

  const transactions = [
    {
      id: 1,
      title: "Monthly Savings",
      date: "Today, 10:30 AM",
      amount: 50000,
      type: "deposit",
    },
    {
      id: 2,
      title: "Laptop Savings",
      date: "Yesterday, 2:15 PM",
      amount: 25000,
      type: "deposit",
    },
    {
      id: 3,
      title: "Savings Interest",
      date: "Oct 20, 2026",
      amount: 12500,
      type: "interest",
    },
    {
      id: 4,
      title: "Emergency Fund",
      date: "Oct 18, 2026",
      amount: 30000,
      type: "deposit",
    },
  ];

  const formatMoney = (amount) =>
    `₦${Number(amount).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const filteredTransactions =
    activeTab === "All"
      ? transactions
      : transactions.filter((transaction) =>
          activeTab === "Deposits"
            ? transaction.type === "deposit"
            : transaction.type === "interest"
        );

  const handleDemoAction = (action) => {
    alert(
      `${action} is a demonstration feature. No real money will be moved.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 font-poppins sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <PiggyBank size={18} />
              <span>EASYBANK SAVINGS</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Save for your future
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Build healthy saving habits and work towards your goals.
            </p>
          </div>

          <button
            onClick={() => handleDemoAction("Create savings plan")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Plus size={19} />
            Create savings plan
          </button>
        </div>

        {/* Main Savings Card */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-32 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <PiggyBank size={27} />
                </div>

                <div>
                  <p className="text-sm text-blue-100">
                    Total savings balance
                  </p>
                  <p className="text-xs text-blue-200">
                    Demo account overview
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {formatMoney(savings.balance)}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-3 py-1.5 text-sm font-medium text-emerald-100">
                  <TrendingUp size={15} />
                  {savings.interestRate}% illustrative rate
                </span>

                <span className="text-xs text-blue-200">
                  Example figures only
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100">
                    Interest earned
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    {formatMoney(savings.totalInterest)}
                  </h3>
                </div>

                <div className="rounded-xl bg-white/15 p-3">
                  <Sparkles size={23} />
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-blue-100">
                  Monthly savings target
                </span>
                <span className="font-semibold">
                  {formatMoney(savings.monthlyTarget)}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[65%] rounded-full bg-white" />
              </div>

              <p className="mt-3 text-xs text-blue-100">
                Illustrative progress towards your monthly target.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <button
            onClick={() => handleDemoAction("Add to savings")}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <ArrowDownLeft size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Add money
              </p>
              <p className="mt-1 text-xs text-slate-500">Grow your savings</p>
            </div>
          </button>

          <button
            onClick={() => handleDemoAction("Withdraw savings")}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600 transition group-hover:bg-orange-500 group-hover:text-white">
              <ArrowUpRight size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Withdraw
              </p>
              <p className="mt-1 text-xs text-slate-500">Access your funds</p>
            </div>
          </button>

          <button
            onClick={() => handleDemoAction("Create savings goal")}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
              <Target size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Set a goal
              </p>
              <p className="mt-1 text-xs text-slate-500">Plan something big</p>
            </div>
          </button>

          <button
            onClick={() => handleDemoAction("Savings schedule")}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5"
          >
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              <CalendarDays size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Auto-save
              </p>
              <p className="mt-1 text-xs text-slate-500">Build a routine</p>
            </div>
          </button>
        </section>

        {/* Savings Goals */}
        <section className="mb-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your savings goals
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Every little step brings you closer.
              </p>
            </div>

            <button
              onClick={() => handleDemoAction("Create savings goal")}
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
            >
              View all <ChevronRight size={17} />
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((goal) => {
              const percentage = Math.min(
                Math.round((goal.saved / goal.target) * 100),
                100
              );

              return (
                <div
                  key={goal.id}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                        {goal.icon}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {goal.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        handleDemoAction(`Manage ${goal.name} goal`)
                      }
                      aria-label={`Manage ${goal.name} goal`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <ChevronRight size={19} />
                    </button>
                  </div>

                  <div className="mb-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Amount saved</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {formatMoney(goal.saved)}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-slate-600">
                      {percentage}%
                    </p>
                  </div>

                  <div
                    className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label={`${goal.name} savings progress`}
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={`h-full rounded-full ${goal.color} transition-all duration-700`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Target: {formatMoney(goal.target)}</span>
                    <span>
                      {formatMoney(Math.max(goal.target - goal.saved, 0))} left
                    </span>
                  </div>

                  <button
                    onClick={() => handleDemoAction(`Add to ${goal.name}`)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                  >
                    <Plus size={17} />
                    Add to goal
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Transactions */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Savings activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest sample transactions.
                </p>
              </div>

              <div className="flex rounded-xl bg-slate-100 p-1">
                {["All", "Deposits", "Interest"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                      activeTab === tab
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between gap-3 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${
                        transaction.type === "interest"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {transaction.type === "interest" ? (
                        <Sparkles size={20} />
                      ) : (
                        <ArrowDownLeft size={20} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {transaction.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      +{formatMoney(transaction.amount)}
                    </p>
                    <p className="mt-1 text-xs capitalize text-slate-400">
                      {transaction.type}
                    </p>
                  </div>
                </div>
              ))}

              {filteredTransactions.length === 0 && (
                <p className="py-8 text-center text-sm text-slate-500">
                  No transactions found.
                </p>
              )}
            </div>

            <button
              onClick={() => handleDemoAction("View all savings transactions")}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              View all activity <ChevronRight size={17} />
            </button>
          </section>

          {/* Savings Tips */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <Target size={24} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                Make saving a habit
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose a realistic target and set a regular schedule. Small,
                consistent contributions can help you make progress over time.
              </p>

              <button
                onClick={() => handleDemoAction("Savings tips")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
              >
                Explore saving tips <ChevronRight size={17} />
              </button>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <ShieldCheck size={23} />
                </div>

                <h3 className="font-bold text-slate-900">
                  Your savings, protected
                </h3>
              </div>

              <p className="text-sm leading-6 text-slate-500">
                Review your account activity regularly and keep your login
                credentials private.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Account security reminders
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={16} className="text-emerald-500" />
                  Regular savings reviews
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CircleDollarSign
                    size={16}
                    className="text-emerald-500"
                  />
                  Clear savings targets
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <Wallet
            size={21}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h3 className="text-sm font-semibold text-amber-900">
              Demonstration page
            </h3>
            <p className="mt-1 text-xs leading-5 text-amber-800">
              All balances, interest rates, goals, and transactions displayed
              here are illustrative sample data. Buttons do not move real
              money, create savings accounts, or execute financial transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}