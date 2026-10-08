import {
  UserRound,
  BriefcaseBusiness,
  CreditCard,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";
export default function BankingSolutions() {
  const services = [
    {
      icon: UserRound,
      title: "Personal Account",
      description:
        "Simple, convenient and flexible accounts designed for everyday banking.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Business Banking",
      description:
        "Power your business with smart financial tools built for growth.",
    },
    {
      icon: CreditCard,
      title: "Cards",
      description:
        "Debit and credit cards designed for secure and seamless transactions.",
    },
    {
      icon: PiggyBank,
      title: "Savings",
      description:
        "Grow your money with flexible savings options and competitive rates.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider font-poppins">
              Banking made simple
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
              Banking solutions{" "}
              <span className="text-blue-600">
                for every need.
              </span>
            </h2>

            <p className="text-slate-500 max-w-xl mt-5 leading-relaxed">
              Whether you're managing your everyday finances, growing your
              business or saving for the future, we've got you covered.
            </p>
          </div>

          <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition font-poppins">
            View all services
            <ArrowRight size={18} />
          </button>

        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
               <Reveal
        key={index}
        delay={index * 100}
      >
              <div
                key={index}
                className="group border border-slate-200 rounded-3xl p-7 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-6">
                  {service.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mt-3">
                  {service.description}
                </p>

                <button className="flex items-center gap-2 text-blue-600 text-sm font-semibold mt-6 group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight size={16} />
                </button>

              </div>
              </Reveal>
            );
          })}

        </div>
      </div>
    </section>
  );
}