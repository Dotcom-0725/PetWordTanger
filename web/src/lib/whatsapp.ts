const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212600000000";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildReservationMessage(name: string, sku: string) {
  return `Bonjour, je suis intéressé(e) par ${name} (réf #${sku}).`;
}

export function buildOrderMessage(
  items: { name: string; price: number; quantity: number }[],
  total: number,
  customer?: { name: string; phone: string; address: string; paymentMethod: string }
) {
  const lines = items.map((i) => `- ${i.quantity}x ${i.name} (${i.price * i.quantity} DH)`).join("\n");
  let message = `Bonjour, je confirme ma commande :\n${lines}\n\nTotal : ${total} DH`;
  if (customer) {
    message += `\n\nNom : ${customer.name}\nTéléphone : ${customer.phone}\nAdresse : ${customer.address}\nPaiement : ${customer.paymentMethod}`;
  }
  return message;
}
