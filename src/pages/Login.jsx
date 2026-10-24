import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
   const [loading, setLoading] = useState(false);
   const [msg, setMsg] = useState('')

  /*const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }*/

  const handleSubmit = async (e) => {
  e.preventDefault();
  if(!email || !password){
   return setMsg("Please provide your details")
  };
  try{
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/dashboard')
  }catch (error){
  setMsg(error.message)
    setLoading(false)
  }
 }

  return (
    <div className="min-h-screen bg-slate-50 flex font-poppins">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#061936] via-[#0b2d68] to-[#1557c7] text-white relative overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl -top-32 -left-32" />

        <div className="relative z-10 p-16 flex flex-col justify-between w-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 w-fit">

            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">
                
              </span>
            </div>

            <span className="text-xl font-bold">
              EASYBANK
            </span>

          </Link>

          {/* Text */}
          <div className="max-w-lg">

            <p className="text-blue-300 uppercase tracking-[0.2em] text-sm font-semibold">
              Welcome back
            </p>

            <h1 className="text-5xl font-bold leading-tight mt-4">
              Your money,
              <span className="block text-blue-400">
                your control.
              </span>
            </h1>

            <p className="text-blue-100 mt-6 leading-relaxed">
              Access your accounts, manage your finances and
              stay in control of your money wherever you are.
            </p>

          </div>

          <p className="text-blue-200 text-sm">
            © 2026 NOVABANK. All rights reserved.
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden mb-10">

            <Link to="/" className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <span className="text-xl font-bold">
                  N
                </span>
              </div>

              <span className="text-xl font-bold text-slate-900">
                NOVABANK
              </span>

            </Link>

          </div>

          {/* Back */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="mt-10">

            <h2 className="text-3xl font-bold text-slate-900 font-poppins">
              Welcome back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to access your NOVABANK account.
            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5 font-poppins"
          >
            <p className="text-red-500">{msg}</p>
            {/* Email */}
            <div>
             <p className="text-red-600">{error}</p>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    h-14
                    pl-12
                    pr-4
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                    transition
                  "
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between mb-2">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full
                    h-14
                    pl-12
                    pr-12
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-500/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
              />

              <span className="text-sm text-slate-500">
                Remember me
              </span>

            </div>

            {/* Submit */}
            <button onClick={handleSubmit}
              type="submit"
              className="
                w-full
                h-14
                rounded-2xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                transition
                hover:-translate-y-0.5
                shadow-lg
                shadow-blue-600/20
              "
            >
            {loading ? 'Signing In': 'Log In'}
            </button>

          </form>

          {/* Signup */}
          <p className="text-center text-sm text-slate-500 mt-8 ">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-poppins font-semibold hover:text-blue-800"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}