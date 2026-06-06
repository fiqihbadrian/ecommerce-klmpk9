"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = getSupabaseClient();
      if (!supabase) return;

      const { data: { session } } = await supabase.auth.getSession();
      
      // Jika tidak ada session dan bukan di halaman public, redirect ke welcome
      const publicRoutes = ['/welcome', '/login', '/register'];
      const currentPath = window.location.pathname;
      
      if (!session && !publicRoutes.includes(currentPath)) {
        router.push('/welcome');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
