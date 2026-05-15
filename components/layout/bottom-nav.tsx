"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faHeart,
  faUser,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  { href: "/home", label: "Home", icon: faHouse },
  { href: "/search", label: "Search", icon: faMagnifyingGlass },
  { href: "/favorites", label: "Favorites", icon: faHeart },
  { href: "/profile", label: "Profile", icon: faUser },
];

const navHeight = 70;
const flatY = 5;
const bubbleSize = 50;

function buildNotchPath(centerX: number) {
  const r = 30;
  const dip = 20;

  return `M${centerX - r * 2},${flatY} Q${centerX - r},${flatY} ${centerX - r * 0.6},${flatY + dip * 0.6} Q${centerX},${flatY + dip + 4} ${centerX + r * 0.6},${flatY + dip * 0.6} Q${centerX + r},${flatY} ${centerX + r * 2},${flatY} Z`;
}

// legacy: previously used, kept for reference


export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [canvasWidth, setCanvasWidth] = useState(430);
  const [horizontalNudge, setHorizontalNudge] = useState(0);
  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  const itemWidth = canvasWidth / items.length;
  const bubbleLeft = itemWidth * activeIndex + itemWidth / 2 + horizontalNudge;
  const activeIcon: IconDefinition = items[activeIndex]?.icon ?? faHouse;

  const combinedPath = useMemo(() => {
    // outer rect then notch path (evenodd will cut notch out) — both in canvas coordinates
    const outer = `M0,${flatY} H${canvasWidth} V${navHeight} H0 Z`;
    const notch = buildNotchPath(bubbleLeft);
    return outer + notch;
  }, [canvasWidth, bubbleLeft]);

  useEffect(() => {
    function updateWidth() {
      const vw = typeof window !== "undefined" ? window.innerWidth : 320;
      const nextWidth = Math.max(260, Math.min(430, Math.floor(vw)));
      setCanvasWidth(nextWidth);
      setHorizontalNudge(vw >= 430 ? -4 : 0);
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      <div className="pointer-events-auto mx-auto w-full max-w-[430px]">
        <div className="relative h-[70px] w-full overflow-visible">
          <svg
            className="absolute bottom-0 left-0 h-[70px] w-full overflow-visible"
            viewBox={`0 0 ${canvasWidth} ${navHeight}`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="bottom-nav-shadow">
                <feDropShadow dx="0" dy="-2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
              </filter>
            </defs>
            <path d={combinedPath} fill="white" fillRule="evenodd" filter="url(#bottom-nav-shadow)" />
          </svg>

          <div
            className="absolute bottom-0 left-0 right-0 grid h-[60px] grid-cols-4 items-center"
            style={{ transform: `translateX(${horizontalNudge}px)` }}
          >
            {items.map((item, index) => {
              const active = index === activeIndex;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative z-10 flex h-12 w-full items-center justify-center"
                  aria-label={item.label}
                  onClick={(event) => {
                    if (active) {
                      event.preventDefault();
                      router.refresh();
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={active ? "h-5 w-5 opacity-0" : "h-5 w-5 text-gray-400"}
                  />
                </Link>
              );
            })}
          </div>

          <div
            className="pointer-events-none absolute top-[-2px] z-20 flex items-center justify-center rounded-full bg-slate-900 shadow-[0_12px_24px_rgba(15,23,42,0.24)] transition-[left,transform,opacity] duration-300 ease-out"
            style={{
              left: `${bubbleLeft}px`,
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`,
              transform: "translateX(-50%) translateZ(0)",
              willChange: "left, transform, opacity",
            }}
          >
            <FontAwesomeIcon icon={activeIcon} className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}