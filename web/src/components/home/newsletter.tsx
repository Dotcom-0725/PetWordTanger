"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/contact";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Newsletter() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(data: NewsletterInput) {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      toast.success("Merci ! Vous êtes inscrit(e) à notre newsletter.");
      reset();
    } else {
      toast.error("Une erreur est survenue, réessayez.");
    }
  }

  return (
    <section className="py-16">
      <div className="container">
        <Reveal className="mx-auto max-w-xl rounded-xl border bg-card p-8 text-center">
          <h3 className="font-display text-lg font-bold">Recevez nos conseils &amp; nouveaux arrivages</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">Un email par mois, jamais de spam.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input type="email" placeholder="votre@email.com" {...register("email")} />
            <Button type="submit" disabled={isSubmitting}>
              S&apos;inscrire
            </Button>
          </form>
          {errors.email && <p className="mt-2 text-xs font-semibold text-destructive">{errors.email.message}</p>}
        </Reveal>
      </div>
    </section>
  );
}
