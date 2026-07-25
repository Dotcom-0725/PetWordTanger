"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Counter } from "@/components/motion/counter";

export function Hero() {
  const t = useTranslations("hero");
  const [videoOpen, setVideoOpen] = useState(false);

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
          className="relative h-[280px] sm:h-[380px] md:h-[460px]"
        >
          <div
            className="absolute inset-0 overflow-hidden shadow-glow"
            style={{ borderRadius: "38% 62% 55% 45% / 48% 42% 58% 52%" }}
          >
            <Image
              src="/images/animals/parrot-1.jpg"
              alt="Perroquet Gris du Gabon, élevage Tanger Animalerie"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/35 via-transparent to-transparent" />
          </div>

          <button
            onClick={() => setVideoOpen(true)}
            aria-label="Voir la vidéo du Perroquet Gris"
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary-700 shadow-glow transition-transform hover:scale-110 sm:h-16 sm:w-16"
          >
            <PlayCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          <Link href={{ pathname: "/animals/[slug]", params: { slug: "perroquet-gris-du-gabon" } } as never}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute start-2 top-[8%] flex items-center gap-2.5 rounded-2xl p-2.5 shadow-soft transition-transform hover:scale-105 sm:-start-4 sm:top-[10%] sm:gap-3 sm:p-3.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-base sm:h-9 sm:w-9 sm:text-lg">
                🦜
              </div>
              <div>
                <b className="block text-xs sm:text-sm">Perroquet Gris</b>
                <span className="text-[10px] text-muted-foreground sm:text-xs">Vidéo disponible</span>
              </div>
            </motion.div>
          </Link>

          <Link href={{ pathname: "/animals/[slug]", params: { slug: "chaton-persan-blanc" } } as never}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="glass absolute end-2 bottom-[6%] flex items-center gap-2.5 rounded-2xl p-2.5 shadow-soft transition-transform hover:scale-105 sm:-end-4 sm:bottom-[8%] sm:gap-3 sm:p-3.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-base sm:h-9 sm:w-9 sm:text-lg">
                🐱
              </div>
              <div>
                <b className="block text-xs sm:text-sm">Chatons Persans</b>
                <span className="text-[10px] text-muted-foreground sm:text-xs">3 disponibles</span>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-3xl overflow-hidden border-none bg-black p-0 sm:w-full">
          <video
            src="/videos/parrot-hero.mp4"
            poster="/images/animals/parrot-1.jpg"
            controls
            autoPlay
            playsInline
            className="aspect-video w-full"
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </DialogContent>
      </Dialog>
    </section>
  );
}
