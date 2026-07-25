"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/contact";
import { useCartStore } from "@/store/cart-store";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const locale = useLocale();
  const router = useRouter();
  const { items, total, clear } = useCartStore();

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  useEffect(() => {
    if (items.length > 0) trackEvent("begin_checkout", { value: total(), currency: "MAD" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(data: CheckoutInput) {
    const message = buildOrderMessage(items, total(), {
      name: data.name,
      phone: data.phone,
      address: `${data.address}, ${data.city}`,
      paymentMethod: data.paymentMethod,
    });
    window.open(buildWhatsAppLink(message), "_blank", "noopener");
    trackEvent("purchase", { value: total(), currency: "MAD", num_items: items.length });
    toast.success("Commande envoyée sur WhatsApp — notre équipe va confirmer la disponibilité.");
    clear();
    router.push("/");
  }

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h1 className="font-display text-2xl font-extrabold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">Ajoutez des produits avant de passer commande.</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 font-display text-3xl font-extrabold">{t("title")}</h1>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="mb-5 font-display text-lg font-bold">{t("shippingInfo")}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="06 XX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("address")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Quartier, rue..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input placeholder="Tanger" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("paymentMethod")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cod">{t("cod")}</SelectItem>
                        <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                        <SelectItem value="whatsapp">À discuter sur WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs text-muted-foreground">
                En confirmant, votre commande s&apos;ouvrira dans WhatsApp avec le récapitulatif complet.
              </p>
              <Button type="submit" size="lg" className="w-full">
                💬 {t("confirm")}
              </Button>
            </form>
          </Form>
        </div>

        <div className="h-fit rounded-2xl border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-bold">Récapitulatif</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="tabular-nums">{formatCurrency(item.price * item.quantity, locale)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t pt-4 font-bold">
            <span>Total</span>
            <span className="tabular-nums">{formatCurrency(total(), locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
