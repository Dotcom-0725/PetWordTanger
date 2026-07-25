"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/counter";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden gradient-mesh py-16 md:py-24">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary-700">
            🌿 {t("eyebrow")}
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight text-balance md:text-6xl">
            {t("titleLine1")}{" "}
            <span className="bg-gradient-to-r from-accent-600 to-accent bg-clip-text text-transparent">
              {t("titleEm")}
            </span>
            .<br />
            {t("titleLine2")}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{t("lead")}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/animals">🐦 {t("ctaPrimary")}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/shop">🛍️ {t("ctaSecondary")}</Link>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t pt-7 sm:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-extrabold text-primary-700">
                <Counter value={11} suffix="+" />
              </p>
              <span className="text-xs text-muted-foreground">{t("statsYears")}</span>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary-700">
                <Counter value={100} suffix="%" />
              </p>
              <span className="text-xs text-muted-foreground">{t("statsHealth")}</span>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary-700">4.9★</p>
              <span className="text-xs text-muted-foreground">{t("statsReviews")}</span>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold text-primary-700">B2B</p>
              <span className="text-xs text-muted-foreground">{t("statsWholesale")}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative h-[340px] md:h-[460px]"
        >
          <div className="absolute inset-0 gradient-primary shadow-glow" style={{ borderRadius: "38% 62% 55% 45% / 48% 42% 58% 52%" }} />
          <button
            aria-label="Voir la vidéo"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-glow transition-transform hover:scale-110"
          >
            <PlayCircle className="h-7 w-7" />
          </button>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -start-4 top-[10%] flex items-center gap-3 rounded-2xl p-3.5 shadow-soft"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-lg">🦜</div>
            <div>
              <b className="block text-sm">Perroquet Gris</b>
              <span className="text-xs text-muted-foreground">Vidéo disponible</span>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="glass absolute -end-4 bottom-[8%] flex items-center gap-3 rounded-2xl p-3.5 shadow-soft"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-lg">🐱</div>
            <div>
              <b className="block text-sm">Chatons Persans</b>
              <span className="text-xs text-muted-foreground">3 disponibles</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
