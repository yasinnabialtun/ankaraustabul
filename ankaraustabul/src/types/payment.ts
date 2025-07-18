// Ödeme sistemi için TypeScript tipleri

export interface PaymentDetails {
  amount: number;
  package: 'premium' | 'vip';
  extras: string[];
  totalAmount: number;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

export interface ShopierConfig {
  apiKey: string;
  secretKey: string;
  merchantId: string;
  environment: 'sandbox' | 'production';
}

export interface PaymentStatus {
  transactionId: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  timestamp: string;
  error?: string;
}

export interface RefundRequest {
  transactionId: string;
  amount: number;
  reason: string;
}

export interface RefundResponse {
  success: boolean;
  refundTransactionId?: string;
  error?: string;
}

export interface WebhookPayload {
  transactionId: string;
  status: string;
  amount: number;
  currency: string;
  timestamp: string;
  signature: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank' | 'wallet';
  icon: string;
  enabled: boolean;
}

export interface PaymentHistory {
  id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus['status'];
  package: 'premium' | 'vip';
  extras: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface PaymentFormData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  bankName?: string;
  accountNumber?: string;
}

export interface PaymentValidation {
  isValid: boolean;
  errors: {
    cardNumber?: string;
    cardHolder?: string;
    expiry?: string;
    cvv?: string;
    general?: string;
  };
}

// Ödeme paketleri
export interface PaymentPackage {
  id: string;
  name: string;
  type: 'premium' | 'vip';
  price: number;
  currency: string;
  duration: number; // gün cinsinden
  features: string[];
  popular?: boolean;
}

// Ek hizmetler
export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // gün cinsinden
  category: 'visibility' | 'support' | 'analytics' | 'promotion';
}

// Ödeme geçmişi filtreleri
export interface PaymentHistoryFilters {
  status?: PaymentStatus['status'];
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  package?: 'premium' | 'vip';
}

// Ödeme raporu
export interface PaymentReport {
  totalAmount: number;
  totalTransactions: number;
  successRate: number;
  averageAmount: number;
  topPackages: Array<{
    package: 'premium' | 'vip';
    count: number;
    revenue: number;
  }>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    transactions: number;
  }>;
} 