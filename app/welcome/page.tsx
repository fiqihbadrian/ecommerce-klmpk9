import Link from "next/link";
import Image from "next/image";
import { InstallAppButton } from "@/components/install-app-button";

export default function WelcomePage() {
  return (
    <main
      className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col items-center justify-between overflow-hidden px-7 py-8"
      style={{ backgroundColor: "#6E0D15" }}
    >
      {/* Top-left decorative bars */}
      <div className="absolute left-5 top-5 z-10 flex items-end gap-1.5">
        <div className="w-2.5 rounded-full" style={{ height: 36, backgroundColor: "#ffffff", opacity: 0.95 }} />
        <div className="w-2.5 rounded-full" style={{ height: 50, backgroundColor: "#ffffff", opacity: 0.85 }} />
        <div className="w-2.5 rounded-full" style={{ height: 36, backgroundColor: "#ffffff", opacity: 0.95 }} />
      </div>

      {/* Decorative white circles */}
      <div
        className="absolute rounded-full bg-white"
        style={{ width: 160, height: 160, top: -50, right: -50, opacity: 0.95 }}
      />

      <div
        className="absolute rounded-full bg-white"
        style={{ width: 140, height: 140, bottom: -45, left: -45, opacity: 0.95 }}
      />

      {/* Bottom-right decorative bars */}
      <div className="absolute bottom-6 right-5 z-10 flex items-end gap-1.5">
        <div className="w-2.5 rounded-full" style={{ height: 36, backgroundColor: "#ffffff", opacity: 0.95 }} />
        <div className="w-2.5 rounded-full" style={{ height: 50, backgroundColor: "#ffffff", opacity: 0.85 }} />
        <div className="w-2.5 rounded-full" style={{ height: 36, backgroundColor: "#ffffff", opacity: 0.95 }} />
      </div>

      <div className="z-10 flex w-full flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-white font-bold text-4xl tracking-tight">
          WELCOME
        </h1>
        <div className="flex h-[200px] w-[200px] items-center justify-center">
          <Image src="/logo-nine.png" alt="Nine Logo" width={220} height={220} className="object-contain" />
        </div>
      </div>

      <div className="z-10 flex w-full max-w-xs flex-col gap-3">
        <Link
          href="/login"
          className="w-full rounded-full bg-white py-4 text-center text-base font-bold transition-all duration-150 hover:bg-gray-100 active:scale-95"
          style={{ color: "#6E0D15" }}
        >
          Masuk
        </Link>
        <Link
          href="/register"
          className="w-full rounded-full bg-white py-4 text-center text-base font-bold transition-all duration-150 hover:bg-gray-100 active:scale-95"
          style={{ color: "#6E0D15" }}
        >
          Daftar
        </Link>
        <Link href="/home" className="pt-1 text-center text-sm font-semibold text-white/90 transition hover:text-white">
          Lihat katalog dulu
        </Link>
        <InstallAppButton />
      </div>
    </main>
  );
}
