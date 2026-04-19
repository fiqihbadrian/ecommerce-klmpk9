"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standaloneMode = window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standaloneMode);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  if (isStandalone || !deferredPrompt) {
    return (
      <p className="pt-1 text-center text-xs font-medium text-white/75">
        Jika tombol install belum muncul, buka menu browser lalu pilih Add to Home Screen.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="w-full rounded-full border border-white/30 bg-white/15 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
    >
      Install aplikasi
    </button>
  );
}
