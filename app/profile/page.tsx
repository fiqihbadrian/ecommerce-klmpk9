"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseClient } from "@/lib/supabaseClient";

type ProfileData = {
  email: string;
  fullName: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      const supabase = getSupabaseClient();

      if (!supabase) {
        setLoading(false);
        setMessage("Supabase env belum tersedia.");
        return;
      }

      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!active) {
        return;
      }

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const fullName = (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "";

      setProfile({
        email: user.email ?? "",
        fullName,
      });
      setName(fullName);
      setLoading(false);
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, []);

  async function handleSave() {
    setMessage(null);
    const supabase = getSupabaseClient();

    if (!supabase) {
      setMessage("Supabase env belum tersedia.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile((current) => (current ? { ...current, fullName: name } : current));
    setMessage("Profil diperbarui.");
  }

  async function handleSignOut() {
    const supabase = getSupabaseClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.replace("/welcome");
  }

  if (loading) {
    return (
      <PageShell>
        <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Profile</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Akun saya</h1>
        </section>
        <EmptyState title="Memuat profil" description="Mengambil sesi aktif dari Supabase..." />
      </PageShell>
    );
  }

  if (!profile) {
    return (
      <PageShell>
        <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Profile</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Akun saya</h1>
        </section>
        <EmptyState
          title="Belum login"
          description="Masuk atau buat akun untuk mengelola profil, favorites, dan checkout demo."
          actionLabel="Masuk sekarang"
          actionHref="/login"
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Profile</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Akun saya</h1>
      </section>

      <section className="glass-card rounded-[28px] p-5">
        <div className="mb-5 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 19c1.7-3.2 4.1-4.8 6.5-4.8s4.8 1.6 6.5 4.8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">{profile.fullName}</p>
            <p className="text-sm text-slate-500">{profile.email}</p>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="profile-name">Nama</label>
          <Input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        {message ? <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{message}</p> : null}

        <div className="mt-5 grid gap-3">
          <Button type="button" onClick={handleSave}>
            Simpan perubahan
          </Button>
          <Button asChild variant="secondary">
            <Link href="/favorites">Lihat favorites</Link>
          </Button>
          <Button type="button" variant="ghost" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </section>
    </PageShell>
  );
}