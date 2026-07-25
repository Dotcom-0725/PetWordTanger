export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentMethod = "cod" | "bank_transfer" | "whatsapp";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface DeliveryTrackingEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: OrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  tracking: DeliveryTrackingEvent[];
  createdAt: string;
}
