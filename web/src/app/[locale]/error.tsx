"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="container flex flex-col items-center py-28 text-center">
      <h1 className="font-display text-2xl font-extrabold">Une erreur est survenue</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Désolé, quelque chose s&apos;est mal passé. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Réessayer</Button>
        <Button variant="outline" asChild>
          <Link href="/">Accueil</Link>
        </Button>
      </div>
    </div>
  );
}
