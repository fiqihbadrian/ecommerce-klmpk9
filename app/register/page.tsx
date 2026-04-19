"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isRateLimitError(errorMessage: string) {
    return /rate limit|email rate limit|too many requests/i.test(errorMessage);
  }

  function isInvalidLoginError(errorMessage: string) {
    return /invalid login credentials|email not confirmed|user not found|invalid email/i.test(
      errorMessage,
    );
  }

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

    const signInResult = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!signInResult.error) {
      setIsSubmitting(false);
      window.location.assign("/home");
      return;
    }

    if (!isInvalidLoginError(signInResult.error.message)) {
      setIsSubmitting(false);
      setMessage(signInResult.error.message);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/home`,
        data: {
          full_name: name,
        },
      },
    });

    setIsSubmitting(false);

    if (error) {
      if (isRateLimitError(error.message)) {
        setMessage(
          "Email sedang dibatasi Supabase. Coba login kalau akun sudah pernah dibuat, atau tunggu beberapa menit sebelum daftar lagi.",
        );
        return;
      }

      setMessage(error.message);
      return;
    }

    if (data.session) {
      window.location.assign("/home");
      return;
    }

    if (data.user) {
      setMessage(
        "Akun berhasil dibuat. Jika verifikasi email aktif, cek inbox atau login setelah verifikasi selesai.",
      );
      window.location.assign("/login?registered=1");
      return;
    }

    window.location.assign("/login?registered=1");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#6c757d] px-3 py-4">
      <section className="relative flex min-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[44px] bg-[#6c757d] p-3">
        <div className="absolute -left-10 -top-14 h-36 w-36 rounded-full bg-white/90 shadow-[3px_9px_24px_rgba(0,0,0,0.35)]" />
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-white/85 shadow-[-8px_-10px_24px_rgba(0,0,0,0.25)]" />

        <div className="mt-auto rounded-[42px] bg-white px-5 pb-8 pt-12 shadow-[-1px_-10px_30px_rgba(0,0,0,0.25)]">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6c757d]">Bergabung</p>
          <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-[#6c757d]">REGISTER</h1>
          <p className="mt-2 text-center text-sm leading-6 text-[#5f6771]">Daftar untuk menyimpan favorites, cart, dan profilmu.</p>

          <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-base font-bold text-[#6c757d]" htmlFor="name">Nama</label>
            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" autoComplete="name" required />
          </div>
          <div className="grid gap-2">
            <label className="text-base font-bold text-[#6c757d]" htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <label className="text-base font-bold text-[#6c757d]" htmlFor="password">Password</label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 6 karakter" autoComplete="new-password" minLength={6} required />
          </div>

          {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}

          <Button type="submit" className="mt-2 w-full text-lg" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Daftar"}
          </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#495057]">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-semibold text-[#343a40]">Masuk</Link>
          </p>
        </div>
      </section>
    </main>
  );
}