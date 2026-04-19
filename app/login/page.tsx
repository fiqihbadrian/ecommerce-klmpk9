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
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#6c757d] px-3 py-4">
      <section className="relative flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[44px] bg-[#6c757d] p-3">
        <div className="absolute -left-10 -top-14 h-36 w-36 rounded-full bg-white/90 shadow-[3px_9px_24px_rgba(0,0,0,0.35)]" />
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/85 shadow-[-8px_-10px_24px_rgba(0,0,0,0.25)]" />

        <div className="mt-auto rounded-[42px] bg-white px-5 pb-8 pt-12 shadow-[-1px_-10px_30px_rgba(0,0,0,0.25)]">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6c757d]">Selamat datang</p>
          <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-[#6c757d]">WELCOME</h1>
          <p className="mt-2 text-center text-sm leading-6 text-[#5f6771]">Gunakan akun Supabase yang sudah kamu siapkan untuk mengakses katalog dan cart.</p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-base font-bold text-[#6c757d]" htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <label className="text-base font-bold text-[#6c757d]" htmlFor="password">Password</label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" autoComplete="current-password" required />
          </div>

          {message ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p> : null}

          <Button type="submit" className="mt-2 w-full text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Masuk"}
          </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#495057]">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-[#343a40]">Daftar</Link>
          </p>
        </div>
      </section>
    </main>
  );
}