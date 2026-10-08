export default function Testimonials() {
  const testimonials = [
    {
      name: "Emeka Okafor",
      role: "Customer",
      avatar: "EO",
      text: "NOVABANK makes banking so easy. The app is simple, fast and reliable.",
    },
    {
      name: "Amina Yusuf",
      role: "Customer",
      avatar: "AY",
      text: "Great customer service and very secure. I've never had a better banking experience.",
    },
    {
      name: "Tunde Balogun",
      role: "Business Owner",
      avatar: "TB",
      text: "The business account has been a game changer for my company.",
    },
  ];

  return (
    <section className="bg-white py-24 font-bebas">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center max-w-2xl mx-auto">

          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Customer stories
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-3">
            What our customers say
          </h2>

          <p className="text-slate-500 mt-5">
            Join thousands of customers who trust NOVABANK
            with their financial journey.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-3xl p-7 hover:shadow-xl transition"
            >

              {/* Stars */}
              <div className="text-yellow-400 text-lg">
                ★★★★★
              </div>

              <p className="text-slate-600 leading-relaxed mt-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-8">

                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  {testimonial.avatar}
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {testimonial.role}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}