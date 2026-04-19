"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type BackButtonProps = {
  fallbackHref?: string;
  className?: string;
};

export function BackButton({ fallbackHref = "/home", className = "" }: BackButtonProps) {
  const router = useRouter();

  function handleBack() {
    if (typeof window === "undefined") {
      router.push(fallbackHref);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Kembali"
      className={className || "flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-[#343a40] transition hover:bg-[#e9ecef]"}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
    </button>
  );
}
