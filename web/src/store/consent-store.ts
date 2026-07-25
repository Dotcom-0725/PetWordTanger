"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConsentStatus = "undecided" | "granted" | "denied";

interface ConsentState {
  status: ConsentStatus;
  setStatus: (status: ConsentStatus) => void;
}

/**
 * Minimal consent gate for analytics/marketing scripts. Real deployments in
 * the EU/UK should pair this with a full CMP (e.g. Cookiebot, Osano) that
 * distinguishes necessary/analytics/marketing categories individually —
 * this single granted/denied toggle is the pragmatic default for a
 * Morocco-based small business, gating analytics + ad pixels together.
 */
export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      status: "undecided",
      setStatus: (status) => set({ status }),
    }),
    { name: "ta-consent" }
  )
);
