export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
};

/**
 * Fire a standard e-commerce event across whichever pixels are configured.
 * Call from client components, e.g. on add-to-cart / reserve / purchase:
 *   trackEvent("add_to_cart", { value: product.price, currency: "MAD" });
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
    dataLayer?: unknown[];
  };

  w.gtag?.("event", name, params);
  w.dataLayer?.push({ event: name, ...params });

  const metaEventMap: Record<string, string> = {
    add_to_cart: "AddToCart",
    reserve: "Lead",
    purchase: "Purchase",
    view_item: "ViewContent",
    begin_checkout: "InitiateCheckout",
  };
  if (metaEventMap[name]) w.fbq?.("track", metaEventMap[name], params);

  const tiktokEventMap: Record<string, string> = {
    add_to_cart: "AddToCart",
    reserve: "SubmitForm",
    purchase: "CompletePayment",
    view_item: "ViewContent",
    begin_checkout: "InitiateCheckout",
  };
  if (tiktokEventMap[name]) w.ttq?.track(tiktokEventMap[name], params);
}
