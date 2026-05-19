"use client";

import { useEffect } from "react";
import { useToastStore } from "@/store/toast";

export function Toast() {
  const { isVisible, message, hideToast } = useToastStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="rounded-lg bg-[#343a40] px-6 py-3 text-sm font-medium text-white shadow-lg">
        {message}
      </div>
    </div>
  );
}
