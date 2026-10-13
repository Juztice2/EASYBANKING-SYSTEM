import { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import Sidebar from "../components/dashboard/Sidebar";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import Transactions from "../components/dashboard/Transactions";
import SpendingChart from "../components/dashboard/SpendingChart";
import Details from "../components/dashboard/Details";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-5 sticky z-50 top-0 md:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-600"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block font-poppins">
            <p className="text-sm text-slate-400 ">
              Welcome back
            </p>

            <h1 className="text-lg font-bold text-slate-900">
              William
            </h1>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="hidden sm:flex w-10 h-10 rounded-full bg-slate-100 items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition">
              <Search size={19} />
            </button>

            <button className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition">
              <Bell size={19} />

              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 border-2 border-white" />
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                WJ
              </div>

              <div className="hidden md:block font-poppins">
                <p className="text-sm font-semibold text-slate-800">
                  William Justice
                </p>

                <p className="text-xs text-slate-400">
                  Premium Account
                </p>
              </div>

              <ChevronDown
                size={17}
                className="hidden md:block text-slate-400"
              />
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-5 md:p-8 max-w-[1500px] mx-auto">
          {/* Greeting */}
          <div className="mb-8">
            <p className="text-sm text-slate-500">
              Wednesday, October 7, 2026
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1 font-poppins">
              Good afternoon, William 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Here's what's happening with your money today.
            </p>
          </div>

          {/* Balance + spending */}
          <div className="grid xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <BalanceCard />
            </div>

            <SpendingChart />
          </div>

          {/* Quick actions */}
          <div className="mt-8">
            <QuickActions />
          </div>

          {/* Transactions */}
          <div className="mt-8">
            <Transactions />
          </div>
          <div className="mt-8">
            <Details />
          </div>
        </div>
      </main>
    </div>
  );
}