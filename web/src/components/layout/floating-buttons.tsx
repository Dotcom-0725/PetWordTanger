"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";

export function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="flex h-11 w-11 items-center justify-center rounded-full border bg-background shadow-soft"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href="tel:+212644498909"
        aria-label="Appeler la boutique"
        className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-white shadow-glow"
      >
        <Phone className="h-5 w-5" />
      </a>

      <a
        href="https://wa.me/212644498909"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-glow"
      >
        💬
      </a>
    </div>
  );
}
