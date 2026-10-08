import {
  ShieldCheck,
  LockKeyhole,
  Smartphone,
  ShieldAlert,
  Landmark,
} from "lucide-react";
import Reveal from "./Reveal";
export default function Security() {
  const securityFeatures = [
    {
      icon: LockKeyhole,
      title: "256-bit Encryption",
      description:
        "Your sensitive information is protected using industry-standard encryption.",
    },
    {
      icon: Smartphone,
      title: "Multi-Factor Auth",
      description:
        "Additional authentication helps protect access to your account.",
    },
    {
      icon: ShieldAlert,
      title: "Fraud Monitoring",
      description:
        "Suspicious activity can be detected and reviewed to help protect your account.",
    },
    {
      icon: Landmark,
      title: "Protected Funds",
      description:
        "We build our banking infrastructure with security and reliability in mind.",
    },
  ];

  return (
    <section className="bg-slate-50 py-24 font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>

            <div className="w-20 h-20 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck size={42} strokeWidth={1.5} />
            </div>

            <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mt-8">
              Your security matters
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3 font-bebas">
              Your security is{" "}
              <span className="text-blue-600">
                our priority.
              </span>
            </h2>

            <p className="text-slate-500 leading-relaxed mt-6 max-w-lg">
              We use modern security technologies and multiple layers
              of protection to help keep your money and personal
              information safe.
            </p>

            <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
              Learn more about our security
              <span>→</span>
            </button>

          </div>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-5">

            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                 <Reveal key={index} delay={index * 100}>

      <div
        className="
          bg-white
          rounded-3xl
          p-7
          border border-slate-200
          hover:shadow-lg
          hover:-translate-y-2
          transition-all
          duration-300
        "
      >

        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon size={24} strokeWidth={1.8} />
        </div>

        <h3 className="font-bold text-slate-900 mt-5">
          {feature.title}
        </h3>

        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          {feature.description}
        </p>

      </div>

    </Reveal>
              );
            })}

          </div>

        </div>
      </div>
    </section>
  );
}