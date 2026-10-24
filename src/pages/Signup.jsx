import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { getDoc, collection , addDoc} from "firebase/firestore";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,

} from "lucide-react";

export const accountDetailsCollection = collection(db, "Account")
export default function Signup() {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 

 /* const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }*/
  const handleSubmit = async(e) => { 
    e.preventDefault();
      try { 
        setLoading(true);
        setError("")
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; 
      /* Save the user's details in Firestore*/
 const accountNumber = Math.floor(
  1000000000 + Math.random() * 9000000000
).toString(); 
const accountDoc = await addDoc(accountDetailsCollection, {
  uid: user.uid,
  Firstname: firstName,
  Lastname: lastName,
  email: user.email,
  accNo: accountNumber,
  account: 50000, // Demo starting balance: ₦50,000
});

console.log("Firestore document ID:", accountDoc.id);


      // Temporary demo navigation
    navigate("/login");
    } catch (error) {
  setError(error.message);
  setLoading(false)
    } 
  }

    const signInWithGoogle = async(e) => { 
    e.preventDefault();
  setError("");
      try { 
        setLoading(true);
      await signInWithPopup(auth, googleProvider);
      // Temporary demo navigation
    navigate("/dashboard");
    } catch (error) {
  setError(error.message);
    } 
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* LEFT */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#061936] via-[#0b2d68] to-[#1557c7] text-white relative overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl -bottom-40 -left-40" />

        <div className="relative z-10 p-16 flex flex-col justify-between w-full">

          <Link to="/" className="flex items-center gap-2 w-fit">

            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">
                N
              </span>
            </div>

            <span className="text-xl font-bold">
              NOVABANK
            </span>

          </Link>

          <div className="max-w-lg">

            <p className="text-blue-300 uppercase tracking-[0.2em] text-sm font-semibold font-poppins">
              Start banking smarter
            </p>

            <h1 className="text-5xl font-bold leading-tight mt-4 font-poppins">
              Your financial
              <span className="block text-blue-400">
                journey starts here.
              </span>
            </h1>

            <p className="text-blue-100 mt-6 leading-relaxed ">
              Create your account in minutes and experience
              simpler, smarter and more secure banking.
            </p>

          </div>

          <p className="text-blue-200 text-sm">
            Secure banking. Built around you.
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-6 py-12">

        <div className="w-full max-w-lg">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8">

            <Link to="/" className="flex items-center gap-2">

              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <span className="text-xl font-bold">
                  E
                </span>
              </div>

              <span className="text-xl font-bold text-slate-900">
                EASYBANK
              </span>

            </Link>

          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to website
          </Link>

          <div className="mt-8">

            <h2 className="text-3xl font-bold text-slate-900 font-poppins">
              Create your account
            </h2>

            <p className="text-slate-500 mt-2">
              Join EASYBANK and take control of your finances.
            </p>

          </div>

          <form onSubmit={handleSubmit}
            className="mt-7 space-y-5 font-poppins"
          >
           {error && <p className="text-red-500">{error}</p>}
            {/* Names */}
            <div className="grid sm:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  First name
                </label>

                <div className="relative">

                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="firstName"
                    placeholder="William"
                    onChange={(e) => SetFirstName(e.target.value)}
                    required
                    className="w-full h-14 pl-11 pr-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>

              </div>

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Last name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Justice"
                  onChange={(e) => SetLastName(e.target.value)}
                  required
                  className="w-full h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  onChange={(e) =>SetEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-14 pl-11 pr-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  onChange={(e) => SetPassword(e.target.value)}
                  minLength={6}
                  required
                  className="w-full h-14 pl-11 pr-12 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                className="w-full h-14 px-4 rounded-2xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 text-sm text-slate-500">

              <input
                type="checkbox"
                required
                className="mt-1 accent-blue-600"
              />

              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-600">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600">
                  Privacy Policy
                </a>.
              </span>

            </label>

            {/* Submit */}
            <button 
              type="submit"
              disabled ={loading}
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
            >
             {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center text-sm text-slate-500 mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Sign in
            </Link>

          </p>
          <div className="justify-self-center mt-3 font-poppins p-3 px-4">
            <p>Sign In with</p>
            <button onClick={signInWithGoogle} className="text-2xl">
              <span className="text-red-600">G</span>mail</button>
          </div>
        </div>
      </div>
    </div>
  );
}