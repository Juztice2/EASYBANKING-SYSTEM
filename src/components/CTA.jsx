export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-[#061936] to-[#1456c7] text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">

          <div>

            <p className="text-blue-300 font-semibold uppercase text-sm tracking-wider">
              Start your journey
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              Ready to bank differently?
            </h2>

            <p className="text-blue-100 mt-4 max-w-xl">
              Open your NOVABANK account today and take
              control of your financial future.
            </p>

          </div>

         <button className=" group bg-blue-500 hover:bg-blue-400 text-white px-7 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/40 hover:-translate-y-1">
  Open an Account

  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
    →
  </span>
</button>

        </div>

      </div>
    </section>
  );
}

