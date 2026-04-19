"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function formatAuthError(errorMessage: string) {
    if (/invalid login credentials/i.test(errorMessage)) {
      return "Email atau password salah. Jika akun baru saja dibuat, cek inbox untuk verifikasi email dulu.";
    }
    if (/email not confirmed/i.test(errorMessage)) {
      return "Email belum diverifikasi. Cek inbox lalu coba masuk lagi.";
    }
    return errorMessage;
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      setMessage("Akun berhasil dibuat. Silakan masuk.");
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const supabase = getSupabaseClient();

    if (!supabase) {
      setIsSubmitting(false);
      setMessage("Supabase env belum tersedia.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (error) {
      setMessage(formatAuthError(error.message));
      return;
    }

    window.location.assign("/home");
  }

  return (
    <main
      className="mx-auto flex min-h-screen w-full max-w-sm flex-col"
      style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#6b7280" }}
    >
      {/* Top area with Back button */}
      <div className="relative flex-shrink-0 px-4 pt-4" style={{ height: "180px" }}>
        {/* Back: transparent, icon + white text */}
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span
            className="text-sm font-semibold text-white"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Back
          </span>
        </div>
      </div>

      {/* White card sliding up from bottom */}
      <div
        className="flex-1 rounded-t-[40px] bg-white px-6 pt-10 pb-8"
        style={{ boxShadow: "0 -4px 30px rgba(0,0,0,0.15)" }}
      >
        {/* Title */}
        <h1
          className="text-center text-3xl font-bold text-gray-500 mb-6"
          style={{ letterSpacing: "0.05em" }}
        >
          WELCOME
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukan Email"
              autoComplete="email"
              required
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-400 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukan Password"
              autoComplete="current-password"
              required
              className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-400 placeholder-gray-400 outline-none focus:border-gray-400 focus:ring-0"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end -mt-1">
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-gray-700"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error message */}
          {message && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full py-4 text-base font-semibold text-white disabled:opacity-70"
            style={{
              backgroundColor: "#4b5563",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {isSubmitting ? "Memproses..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-800" />
          <span className="text-xs font-medium text-gray-700">Or Sign in with</span>
          <div className="h-px flex-1 bg-gray-800" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-6">
          {/* Facebook */}
          <button className="flex h-12 w-12 items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="#1877F2"/>
              <path d="M27 20H22.5V30H18.5V20H16V16.5H18.5V14.5C18.5 11.8 20.1 10 23 10L26 10.03V13.4H24C22.9 13.4 22.5 13.9 22.5 14.8V16.5H26L27 20Z" fill="white"/>
            </svg>
          </button>

          {/* Google */}
          <button className="flex h-12 w-12 items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.6 20.45C39.6 19.03 39.48 17.66 39.26 16.36H20.4V24.08H31.18C30.7 26.58 29.24 28.7 27.06 30.12V35.12H33.58C37.36 31.63 39.6 26.48 39.6 20.45Z" fill="#4285F4"/>
              <path d="M20.4 40C25.8 40 30.34 38.18 33.58 35.12L27.06 30.12C25.24 31.34 22.96 32.08 20.4 32.08C15.18 32.08 10.76 28.54 9.14 23.78H2.42V28.94C5.64 35.34 12.52 40 20.4 40Z" fill="#34A853"/>
              <path d="M9.14 23.78C8.74 22.56 8.52 21.26 8.52 19.92C8.52 18.58 8.74 17.28 9.14 16.06V10.9H2.42C1.06 13.6 0.4 16.68 0.4 19.92C0.4 23.16 1.06 26.24 2.42 28.94L9.14 23.78Z" fill="#FBBC05"/>
              <path d="M20.4 7.76C23.2 7.76 25.72 8.72 27.7 10.6L33.72 4.58C30.34 1.46 25.8 -0.08 20.4 0C12.52 0 5.64 4.66 2.42 11.06L9.14 16.22C10.76 11.46 15.18 7.76 20.4 7.76Z" fill="#EA4335"/>
            </svg>
          </button>

          {/* Apple */}
          <button className="flex h-12 w-12 items-center justify-center">
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.76 21.28C29.74 17.86 31.48 15.3 35 13.44C33.06 10.7 30.12 9.2 26.3 8.92C22.68 8.64 18.72 11.06 17.3 11.06C15.8 11.06 12.32 9.02 9.5 9.02C3.68 9.12 -0.2 13.5 -0.2 21.4C-0.2 26.04 1.64 30.96 4 34.3C6.02 37.1 7.76 39.36 10.26 39.32C12.66 39.28 13.56 37.78 16.76 37.78C19.94 37.78 20.72 39.32 23.26 39.28C25.84 39.24 27.36 37.06 29.34 34.26C31.66 31.02 32.6 27.9 32.64 27.72C32.56 27.7 29.78 26.62 29.76 21.28Z" fill="#1D1D1F"/>
              <path d="M24.1 5.76C25.74 3.78 26.88 1.06 26.56 -1.68C24.18 -1.56 21.34 -0.06 19.64 1.92C18.1 3.7 16.74 6.5 17.12 9.14C19.74 9.34 22.42 7.78 24.1 5.76Z" fill="#1D1D1F"/>
            </svg>
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-xs font-bold text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-gray-800">
            Sign up!
          </Link>
        </p>
      </div>
    </main>
  );
}