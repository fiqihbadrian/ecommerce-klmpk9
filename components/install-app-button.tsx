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

  // Tombol download APK - selalu tampil
  return (
    <div className="flex flex-col gap-2">
      <a
        href="https://github.com/fiqihbadrian/ecommerce-klmpk9-releases/releases/download/v1.0.1/Nine-Store-v1.0.1.apk"
        download="Nine-Store.apk"
        className="w-full rounded-full border border-white/30 bg-white/15 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
      >
        Download APK (Android)
      </a>
      
      {/* Fallback text untuk PWA */}
      {!isStandalone && deferredPrompt && (
        <button
          type="button"
          onClick={handleInstall}
          className="w-full rounded-full border border-white/30 bg-white/10 py-2.5 text-center text-xs font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/15 active:scale-95"
        >
          Atau install sebagai PWA
        </button>
      )}
      
      <p className="pt-1 text-center text-xs font-medium text-white/70">
        Setelah download, buka file APK untuk install aplikasi
      </p>
    </div>
  );
}
