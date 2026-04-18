"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setMessage(error.message);
      return;
    }

    router.replace("/home");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-6">
      <section className="glass-card rounded-[32px] p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/70">Selamat datang</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Masuk ke akunmu</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Gunakan akun Supabase yang sudah kamu siapkan untuk mengakses katalog dan cart.</p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" autoComplete="current-password" required />
          </div>

          {message ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Memproses..." : "Masuk"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-primary">Daftar</Link>
        </p>
      </section>
    </main>
  );
}