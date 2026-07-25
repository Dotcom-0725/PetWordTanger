"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useConsentStore } from "@/store/consent-store";

export function CookieConsentBanner() {
  const { status, setStatus } = useConsentStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || status !== "undecided") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border bg-card p-5 shadow-glow sm:flex-row sm:items-center"
      >
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground">
          Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre expérience (Google Analytics,
          Meta, TikTok). Vous pouvez accepter ou refuser à tout moment.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={() => setStatus("denied")}>
            Refuser
          </Button>
          <Button size="sm" onClick={() => setStatus("granted")}>
            Accepter
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
