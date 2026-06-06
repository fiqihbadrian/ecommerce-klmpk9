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

  // PWA install button - selalu tampilkan dengan fallback
  return (
    <div className="flex flex-col gap-2">
      {!isStandalone && deferredPrompt ? (
        <button
          type="button"
          onClick={handleInstall}
          className="w-full rounded-full border border-white/30 bg-white/15 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
        >
          Install Aplikasi (PWA)
        </button>
      ) : !isStandalone ? (
        <div className="w-full rounded-xl border border-white/30 bg-white/10 p-4 backdrop-blur-sm">
          <p className="mb-2 text-center text-xs font-semibold text-white">Cara Install PWA:</p>
          <ul className="space-y-1 text-xs text-white/80">
            <li>• Chrome: Menu (⋮) → Install app</li>
            <li>• Safari iOS: Share → Add to Home Screen</li>
            <li>• Browser lain: Cek menu browser</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
