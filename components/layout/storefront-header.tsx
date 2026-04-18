import Link from "next/link";

type StorefrontHeaderProps = {
  title?: string;
  subtitle?: string;
};

export function StorefrontHeader({
  title = "K9 Mart",
  subtitle = "Temukan produk favoritmu di sini.",
}: StorefrontHeaderProps) {
  return (
    <header className="mb-5 rounded-[28px] bg-[#0f172a] px-4 py-4 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">Mobile Store</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
        </div>
        <Link
          href="/cart"
          aria-label="Open cart"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3.5 5h2l2.2 10.5a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.5l1.6-7.1H7" />
            <circle cx="10" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
          </svg>
        </Link>
      </div>

      <Link
        href="/search"
        className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/75 transition hover:bg-white/15"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <span>{subtitle}</span>
      </Link>
    </header>
  );
}