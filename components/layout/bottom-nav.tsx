"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

const navHeight = 65;
const flatY = 5;

function buildCurvePath(centerX: number, navWidth: number) {
  const r = 30;
  const dip = 20;

  return `M0,${flatY} L${centerX - r * 2},${flatY} Q${centerX - r},${flatY} ${centerX - r * 0.6},${flatY + dip * 0.6} Q${centerX},${flatY + dip + 4} ${centerX + r * 0.6},${flatY + dip * 0.6} Q${centerX + r},${flatY} ${centerX + r * 2},${flatY} L${navWidth},${flatY} L${navWidth},${navHeight} L0,${navHeight} Z`;
}

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [navWidth, setNavWidth] = useState(320);
  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  const itemWidth = navWidth / items.length;
  const bubbleLeft = itemWidth * activeIndex + itemWidth / 2;
  const activeIcon: IconDefinition = items[activeIndex]?.icon ?? faHouse;
  
  // Memoize the SVG path to avoid recalculating on every render
  const curvePath = useMemo(() => buildCurvePath(bubbleLeft, navWidth), [bubbleLeft, navWidth]);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    function updateWidth() {
      const currentNode = containerRef.current;

      if (!currentNode) {
        return;
      }

      const nextWidth = Math.max(260, Math.floor(currentNode.clientWidth));
      setNavWidth(nextWidth);
    }

    updateWidth();

    const observer = new ResizeObserver(() => {
      // Debounce resize updates
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          updateWidth();
        });
      }
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Delay bubble animation slightly to avoid initial jank
    const timer = setTimeout(() => {
      setBubbleVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 pb-0">
      <div ref={containerRef} className="mx-auto w-full max-w-md">
        <div className="relative h-16 w-full">
          <svg
            className="absolute bottom-0 left-0 h-16 w-full overflow-visible"
            viewBox={`0 0 ${navWidth} 65`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="bottom-nav-shadow">
                <feDropShadow dx="0" dy="-2" stdDeviation="3" floodColor="rgba(0,0,0,0.08)" />
              </filter>
            </defs>
            <path d={curvePath} fill="white" filter="url(#bottom-nav-shadow)" />
          </svg>

          <div className="absolute bottom-0 left-0 right-0 grid h-[60px] grid-cols-4 items-center">
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
                    className={active ? "h-5 w-5 text-transparent" : "h-5 w-5 text-gray-400"}
                  />
                </Link>
              );
            })}
          </div>

          <div
            className={`pointer-events-none absolute top-0 z-20 flex h-[50px] w-[50px] -translate-x-1/2 items-center justify-center rounded-full bg-gray-900 transition-[opacity,transform] duration-300 ease-out ${bubbleVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
            style={{
              left: `${bubbleLeft}px`,
            }}
          >
            <FontAwesomeIcon icon={activeIcon} className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}