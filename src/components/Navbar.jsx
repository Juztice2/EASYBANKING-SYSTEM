import { useState } from "react";
import { Link } from "react-router-dom";
import favicon from '../images/favicon.png'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 font-raleway">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold  text-xl">
                <img src={favicon} />
              </span>
            </div>

            <span className="text-2xl text-slate-900 font-poppins tracking-tighter">
            
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-blue-600"
            >
             <Link to='/signup'>Personal </Link>
            </a>

            <a
              href="#banking-solution"
              className="text-sm font-medium text-slate-600 hover:text-blue-4
              200 transition"
            >
              Business
              
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-blue-200 transition"
            >
              Company
            </a>

            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-blue-200 transition"
            >
              About
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-6">
           <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600">Login</Link>

          <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition"> Open Account →</Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-800 text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col gap-5">

              <a href="#" className="text-slate-700 font-medium">
                Personal
              </a>

              <a href="#" className="text-slate-700 font-medium">
                Business
              </a>

              <a href="#" className="text-slate-700 font-medium">
                Company
              </a>

              <a href="#" className="text-slate-700 font-medium">
                About
              </a>

              <hr />

             <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600">Login</Link>

             <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition">Open Account →</Link>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}