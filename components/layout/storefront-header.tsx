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
    <header className="mb-5 rounded-[28px] bg-[#6c757d] p-3 text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#495057]">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">K9</span>
        </div>

        <Link
          href="/search"
          className="flex h-12 flex-1 items-center gap-2 rounded-[31px] bg-white px-4 text-sm font-semibold text-[#b2b8bf]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#8f97a0]" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <span className="truncate">Masukan teks</span>
        </Link>

        <Link
          href="/cart"
          aria-label="Open cart"
          className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-white text-[#495057] transition hover:bg-white/90"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3.5 5h2l2.2 10.5a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.5l1.6-7.1H7" />
            <circle cx="10" cy="20" r="1.4" />
            <circle cx="17" cy="20" r="1.4" />
          </svg>
        </Link>
      </div>

      <div className="mt-3 rounded-2xl bg-white/14 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">{title}</p>
        <p className="mt-1 text-xs text-white/80">{subtitle}</p>
      </div>
    </header>
  );
}