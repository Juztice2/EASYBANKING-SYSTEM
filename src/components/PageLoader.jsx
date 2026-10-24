import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      
      {/* Background Decorations */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">

        {/* Animated Logo */}
        <div className="relative mb-8 flex h-32 w-32 items-center justify-center">

          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-200/60 border-t-blue-600" />

          {/* Inner Rotating Ring */}
          <div className="absolute inset-3 animate-[spin_3s_linear_infinite_reverse] rounded-full border-2 border-dashed border-sky-400/60" />

          {/* Logo Background */}
          <div className="relative flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 shadow-xl shadow-blue-600/30">
            <span className="text-5xl font-black text-white">
              E
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -left-10 top-0 h-full w-8 rotate-12 bg-white/30 blur-sm animate-[shine_2s_ease-in-out_infinite]" />
            </div>
          </div>

          {/* Floating Decorative Dots */}
          <span className="absolute -right-1 top-5 h-3 w-3 animate-bounce rounded-full bg-sky-400" />
          <span className="absolute -bottom-1 left-5 h-2.5 w-2.5 animate-pulse rounded-full bg-blue-600" />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold tracking-[0.18em] text-slate-800">
          EASY<span className="text-blue-600">BANK</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm font-medium tracking-wide text-slate-500">
          Banking made simple.
        </p>

        {/* Loading Indicator */}
        <div className="mt-9 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.3s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-sky-400" />
        </div>

        {/* Loading Text */}
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          Securely preparing your experience
        </p>

        {/* Progress Bar */}
        <div className="mt-7 h-1.5 w-48 overflow-hidden rounded-full bg-blue-100">
          <div className="h-full w-1/2 animate-[loading_1.8s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-blue-700" />
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Your banking experience, reimagined.
        </p>
      </div>
    </div>
  );
}

