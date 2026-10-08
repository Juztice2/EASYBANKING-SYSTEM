import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#061936] via-[#0b2d68] to-[#1557c7] text-white overflow-hidden font-poppins">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="min-h-[650px] grid lg:grid-cols-2 gap-12 items-center py-16">

          {/* LEFT SIDE */}
          <div className="relative z-10">

            <p className="uppercase tracking-[0.25em] text-sm text-blue-300 font-semibold mb-6">
              Modern banking for a brighter tomorrow
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Banking that moves
              <span className="block text-blue-400">
                with your life.
              </span>
            </h1>

            <p className="mt-7 text-lg md:text-xl text-blue-100 max-w-xl leading-relaxed">
              Simple, secure banking designed around you.
              Manage your money, make payments and reach your
              financial goals from anywhere.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-9 font-bebas">

           <Link to="/signup"
  className="group inline-flex items-center bg-blue-500 hover:bg-blue-400 text-white px-7 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-900/30 hover:-translate-y-1">
  Open an Account
<span className="ml-2 group-hover:translate-x-1 transition-transform">
    →
  </span>
</Link>

              <button className="border border-white/50 hover:bg-white hover:text-blue-900 px-7 py-4 rounded-full font-semibold transition">
                Explore Services
              </button>

            </div>

            {/* Trust features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">

              <div className="flex items-center gap-3">
               <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    Secure Banking
                  </p>

                  <p className="text-xs text-blue-200">
                    Your money, our priority
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock3 size={20} />
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    24/7 Access
                  </p>

                  <p className="text-xs text-blue-200">
                    Bank anytime
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <p className="font-semibold text-sm">
                    No Hidden Fees
                  </p>

                  <p className="text-xs text-blue-200">
                    Transparent & fair
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative min-h-[550px] flex items-center justify-center">

            {/* Background glow */}
            <div className="absolute w-[450px] h-[450px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"/>

            {/* Bank Card */}
            <div className="absolute top-10 left-0 lg:left-5 w-[330px] h-[205px] rounded-3xl bg-gradient-to-br from-blue-400 via-blue-700 to-blue-950 p-6 shadow-2xl rotate-[-8deg] border border-white/20 animate-[float_5s_ease-in-out_infinite]">

              <div className="flex justify-between items-start">
                <span className="font-bold tracking-wider">
                  NOVABANK
                </span>

                <span className="text-2xl">◈</span>
              </div>

              <div className="mt-8 text-2xl">
                ▰ ▰ ▰
              </div>

              <p className="mt-4 text-lg tracking-[0.2em]">
                **** **** 4829
              </p>

              <div className="flex justify-between mt-3">
                <div>
                  <p className="text-[9px] text-blue-200">
                    CARD HOLDER
                  </p>
                  <p className="text-sm font-medium">
                    WILLIAM JUSTICE
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-blue-200">
                    VALID THRU
                  </p>
                  <p className="text-sm">
                    12/29
                  </p>
                </div>
              </div>

            </div>

            {/* Phone */}
            <div className="relative z-10 mt-20 ml-24 w-[275px] h-[520px] rounded-[40px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-700">

              <div className="h-full bg-slate-50 rounded-[30px] overflow-hidden text-slate-900">

                {/* Phone top */}
                <div className="bg-white px-5 pt-7 pb-4">

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">
                        Good morning,
                      </p>

                      <p className="font-bold">
                        William Justice
                      </p>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                      👤
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="mt-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">

                    <p className="text-xs text-blue-100">
                      Total Balance
                    </p>

                    <p className="text-2xl font-bold mt-1">
                      ₦1,240,500
                    </p>

                    <p className="text-xs mt-2 text-green-200">
                      ↑ 2.5% from last month
                    </p>

                  </div>

                </div>

                {/* Quick actions */}
                <div className="px-5 py-4 bg-white">

                  <div className="grid grid-cols-4 gap-3 text-center">

                    <div>
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                        ↑
                      </div>
                      <p className="text-[10px] mt-2">
                        Transfer
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                        ₦
                      </div>
                      <p className="text-[10px] mt-2">
                        Bills
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                        +
                      </div>
                      <p className="text-[10px] mt-2">
                        Top Up
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                        •••
                      </div>
                      <p className="text-[10px] mt-2">
                        More
                      </p>
                    </div>

                  </div>

                </div>

                {/* Transactions */}
                <div className="px-5 py-4">

                  <div className="flex justify-between">
                    <p className="font-bold text-sm">
                      Recent Transactions
                    </p>

                    <p className="text-xs text-blue-600">
                      View all
                    </p>
                  </div>

                  <div className="mt-4 space-y-4">

                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                          ↓
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            Salary Credit
                          </p>
                          <p className="text-[9px] text-slate-400">
                            Today, 10:24 AM
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-green-600 font-semibold">
                        +₦450,000
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                          N
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            Netflix
                          </p>
                          <p className="text-[9px] text-slate-400">
                            Yesterday
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-red-500 font-semibold">
                        -₦12,500
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
                          ⚡
                        </div>

                        <div>
                          <p className="text-xs font-semibold">
                            Electricity Bill
                          </p>
                          <p className="text-[9px] text-slate-400">
                            Apr 28, 2025
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-red-500 font-semibold">
                        -₦24,500
                      </p>
                    </div>

                  </div>
                  <div className="mt-6">

  <div className="flex justify-between items-center">
    <p className="text-xs font-bold">
      Spending
    </p>

    <p className="text-[10px] text-slate-400">
      This month
    </p>
  </div>

  <div className="flex items-end gap-2 h-20 mt-3">

    <div className="w-full bg-blue-100 rounded-t-lg h-[35%]" />

    <div className="w-full bg-blue-200 rounded-t-lg h-[55%]" />

    <div className="w-full bg-blue-300 rounded-t-lg h-[45%]" />

    <div className="w-full bg-blue-400 rounded-t-lg h-[70%]" />

    <div className="w-full bg-blue-500 rounded-t-lg h-[60%]" />

    <div className="w-full bg-blue-600 rounded-t-lg h-[85%]" />

    <div className="w-full bg-blue-700 rounded-t-lg h-[65%]" />

  </div>

</div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}