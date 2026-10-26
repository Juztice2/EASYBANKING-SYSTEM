export default function Footer() {
  return (
    <footer className="bg-[#061936] text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <span className="font-bold text-xl">
                  E
                </span>
              </div>

              <span className="text-xl font-bold">
                EASYBANK
              </span>

            </div>

            <p className="text-blue-200 text-sm leading-relaxed mt-5 max-w-sm">
              Simple, secure and modern banking designed
              to help you make the most of your money.
            </p>

            <div className="flex gap-3 mt-6">

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition">
                X
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition">
                f
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition">
                in
              </button>

              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 transition">
                ◎
              </button>

            </div>

          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold">
              Products
            </h3>

            <div className="flex flex-col gap-4 mt-5 text-sm text-blue-200">
              <a href="#" className="hover:text-white">Personal Banking</a>
              <a href="#" className="hover:text-white">Business Banking</a>
              <a href="#" className="hover:text-white">Cards</a>
              <a href="#" className="hover:text-white">Savings</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold">
              Company
            </h3>

            <div className="flex flex-col gap-4 mt-5 text-sm text-blue-200">
              <a href="#" className="hover:text-white">About Us</a>
              <a href="#" className="hover:text-white">Careers</a>
              <a href="#" className="hover:text-white">News</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold">
              Support
            </h3>

            <div className="flex flex-col gap-4 mt-5 text-sm text-blue-200">
              <a href="#" className="hover:text-white">Help Center</a>
              <a href="#" className="hover:text-white">Security</a>
              <a href="#" className="hover:text-white">FAQs</a>
              <a href="#" className="hover:text-white">Contact Support</a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-7 flex flex-col md:flex-row justify-between gap-4 text-sm text-blue-300">

          <p>
            © 2026 NOVABANK. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy
            </a>

            <a href="#" className="hover:text-white">
              Terms
            </a>

            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}