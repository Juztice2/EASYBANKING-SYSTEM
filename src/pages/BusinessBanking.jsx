import React from "react";
import {
  Building2,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Wallet,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function BusinessBanking() {
  const services = [
    {
      icon: Wallet,
      title: "Business Accounts",
      description:
        "Manage your business finances with a dedicated account built for your goals.",
    },
    {
      icon: ArrowUpRight,
      title: "Payments & Transfers",
      description:
        "Keep track of business payments and transfers in one convenient place.",
    },
    {
      icon: CreditCard,
      title: "Business Cards",
      description:
        "Explore convenient card management tools for your business expenses.",
    },
    {
      icon: BarChart3,
      title: "Financial Insights",
      description:
        "Understand your cash flow with clear summaries of your business activity.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-poppins">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
              <Building2 size={17} />
              Banking for businesses
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Business banking
              <span className="mt-2 block text-sky-300">
                built around you.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              Take control of your business finances with simple account
              management, payment tracking, and financial insights—all in
              one place.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-900 shadow-lg transition hover:-translate-y-1 hover:bg-sky-50"
              >
                Explore services
                <ArrowRight size={18} />
              </a>

              <a
                href="#benefits"
                className="rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Learn more
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-sky-300" />
                Simple account management
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-sky-300" />
                Clear financial insights
              </span>
            </div>
          </div>

          {/* Decorative Banking Card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-sky-300/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-100">
                    EASYBANK
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    Business overview
                  </h2>
                </div>

                <div className="rounded-2xl bg-white/15 p-3 text-sky-200">
                  <Building2 size={26} />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-blue-950/30 p-5">
                <p className="text-sm text-blue-200">
                  Sample business balance
                </p>
                <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                  ₦2,450,000.00
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-sky-200">
                  <BarChart3 size={17} />
                  Illustrative dashboard preview
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/20 text-sky-200">
                    <ArrowUpRight size={21} />
                  </div>
                  <p className="text-sm text-blue-200">Payments</p>
                  <p className="mt-1 text-lg font-bold text-white">
                    Manage
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-300/20 text-sky-200">
                    <ShieldCheck size={21} />
                  </div>
                  <p className="text-sm text-blue-200">Security</p>
                  <p className="mt-1 text-lg font-bold text-white">
                    Protected
                  </p>
                </div>
              </div>

              <p className="mt-5 text-center text-xs text-blue-200">
                Demo illustration · Not a real account balance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Our services
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything your business needs
          </h2>

          <p className="mt-4 leading-7 text-slate-500">
            Explore tools designed to help you organize your finances and
            manage everyday business banking tasks.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {service.description}
                </p>

                <a
                  href="#benefits"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
                >
                  
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Banking made simpler
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Spend less time managing finances.
              <span className="text-blue-700"> Focus on growth.</span>
            </h2>

            <p className="mt-5 leading-8 text-slate-500">
              Bring your business banking tasks into one organized experience.
              Review account activity, understand your finances, and keep
              important information within reach.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "A clear view of your account activity",
                "Convenient business payment management",
                "Tools to help organize your finances",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <p className="font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 to-blue-950 p-8 sm:p-12">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-300/20 blur-2xl" />

            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white">
                <ShieldCheck size={34} />
              </div>

              <h3 className="mt-8 text-2xl font-extrabold text-white sm:text-3xl">
                Banking with clarity and confidence.
              </h3>

              <p className="mt-4 leading-8 text-blue-100">
                Explore a modern banking interface built around convenience,
                visibility, and thoughtful account management.
              </p>

              <a
                href="#services"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-900 transition hover:bg-sky-100"
              >
                Discover features
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="font-bold tracking-wider text-blue-800">
            EASYBANK
          </p>
          <p>
            Demo banking interface · No real financial services provided
          </p>
        </div>
      </footer>
    </main>
  );
}
