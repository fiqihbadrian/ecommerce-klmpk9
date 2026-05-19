"use client";

import { create } from "zustand";

type ToastState = {
  isVisible: boolean;
  message: string;
  showToast: (message: string) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: "",
  showToast: (message) => set({ isVisible: true, message }),
  hideToast: () => set({ isVisible: false, message: "" }),
}));
