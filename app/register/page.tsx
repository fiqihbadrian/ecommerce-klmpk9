"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function isRateLimitError(errorMessage: string) {
    return /rate limit|email rate limit|too many requests/i.test(errorMessage);
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
        const signInResult = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!signInResult.error) {
          router.replace("/home");
          return;
        }

        setMessage(
          "Email sedang dibatasi Supabase. Jika akun sudah pernah dibuat, coba login. Kalau belum, tunggu beberapa menit lalu daftar lagi.",
        );
        return;
      }

      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.replace("/home");
      return;
    }

    if (data.user) {
      setMessage(
        "Akun berhasil dibuat. Jika verifikasi email aktif, cek inbox atau login setelah verifikasi selesai.",
      );
      router.replace("/login?registered=1");
      return;
    }

    router.replace("/login?registered=1");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-6">
      <section className="glass-card rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">Bergabung</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Buat akun baru</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Daftar untuk menyimpan favorites, cart, dan profilmu.</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">Nama</label>
            <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nama lengkap" autoComplete="name" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 6 karakter" autoComplete="new-password" minLength={6} required />
          </div>

          {message ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Daftar"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-primary">Masuk</Link>
        </p>
      </section>
    </main>
  );
}