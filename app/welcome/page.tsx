import Link from "next/link";

export default function WelcomePage() {
  return (
    <main
      className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-between overflow-hidden px-7 pb-12"
      style={{ backgroundColor: "#6C757D" }}
    >
      <div className="absolute left-5 top-5 z-10 flex items-end gap-1.5">
        <div className="w-2.5 rounded-full opacity-85" style={{ height: 36, backgroundColor: "#8fa0ae" }} />
        <div className="w-2.5 rounded-full opacity-65" style={{ height: 50, backgroundColor: "#9eb0bc" }} />
        <div className="w-2.5 rounded-full opacity-85" style={{ height: 36, backgroundColor: "#8fa0ae" }} />
      </div>

      <div
        className="absolute rounded-full bg-white shadow-xl/30"
        style={{ width: 160, height: 160, top: -50, right: -50, opacity: 0.95 }}
      />

      <div
        className="absolute rounded-full bg-white shadow-xl/30"
        style={{ width: 140, height: 140, bottom: -45, left: -45, opacity: 0.95 }}
      />

      <div className="absolute bottom-6 right-5 z-10 flex items-end gap-1.5">
        <div className="w-2.5 rounded-full opacity-85" style={{ height: 36, backgroundColor: "#8fa0ae" }} />
        <div className="w-2.5 rounded-full opacity-65" style={{ height: 50, backgroundColor: "#9eb0bc" }} />
        <div className="w-2.5 rounded-full opacity-85" style={{ height: 36, backgroundColor: "#8fa0ae" }} />
      </div>

      <div className="z-10 flex w-full flex-1 items-center justify-center">
        <h1 className="text-white font-bold text-4xl tracking-tight ">
          WELCOME
        </h1>
      </div>

      <div className="z-10 flex w-full max-w-xs flex-col gap-3.5">
        <Link
          href="/login"
          className="w-full rounded-full bg-white py-4 text-center text-base font-bold text-[#546070] transition-all duration-150 hover:bg-gray-100 active:scale-95"
        >
          Masuk
        </Link>
        <Link
          href="/register"
          className="w-full rounded-full bg-white py-4 text-center text-base font-bold text-[#546070] transition-all duration-150 hover:bg-gray-100 active:scale-95"
        >
          Daftar
        </Link>
        <Link href="/home" className="pt-1 text-center text-sm font-semibold text-white/90 transition hover:text-white">
          Lihat katalog dulu
        </Link>
      </div>
    </main>
  );
}