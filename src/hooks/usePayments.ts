import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  Payment,
  CreateOrderInput,
  CreateSubscriptionOrderInput,
  CreateVerificationOrderInput,
  RazorpayVerificationInput,
  RazorpayOrder,
  ApiResponse,
} from '@/types';

// Query keys
export const paymentKeys = {
  all: ['payments'] as const,
  history: () => [...paymentKeys.all, 'history'] as const,
};

// Razorpay configuration from environment
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

// Load Razorpay script
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      if (existingScript.hasAttribute('data-loading')) {
        // Wait for existing load
        const checkInterval = setInterval(() => {
          if (window.Razorpay) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
        return;
      }
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    // Note: Razorpay doesn't provide official SRI hashes, so we omit integrity attribute
    script.setAttribute('data-loading', 'true');
    script.onload = () => {
      script.removeAttribute('data-loading');
      resolve(true);
    };
    script.onerror = () => {
      script.removeAttribute('data-loading');
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Fetch payment history
export function usePaymentHistory() {
  return useQuery({
    queryKey: paymentKeys.history(),
    queryFn: async () => {
      const response = await api.get<ApiResponse<Payment[]>>('/payments/history');
      return response.data;
    },
  });
}

// Create order for course enrollment
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      const response = await api.post<ApiResponse<{ order: RazorpayOrder; payment: Payment }>>('/payments/create-order', data);
      return response.data;
    },
  });
}

// Verify payment after Razorpay callback
export function useVerifyPayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RazorpayVerificationInput) => {
      const response = await api.post<ApiResponse<{ payment: Payment }>>('/payments/verify', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}

// Create verification order for teachers
export function useCreateVerificationOrder() {
  return useMutation({
    mutationFn: async (data: CreateVerificationOrderInput) => {
      console.log('🔵 useCreateVerificationOrder - Starting mutation');
      console.log('📤 Request data:', data);
      console.log('📍 Endpoint: /payments/verification/create-order');
      
      try {
        const response = await api.post<ApiResponse<{ order: RazorpayOrder; payment: Payment }>>('/payments/verification/create-order', data);
        console.log('✅ useCreateVerificationOrder - Success response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('❌ useCreateVerificationOrder - API Error:', error);
        console.error('📋 Error response:', error?.response?.data);
        console.error('📋 Error status:', error?.response?.status);
        throw error;
      }
    },
  });
}

// Verify verification payment
export function useVerifyVerificationPayment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: RazorpayVerificationInput) => {
      console.log('🔵 useVerifyVerificationPayment - Starting mutation');
      console.log('📤 Request data:', data);
      console.log('📍 Endpoint: /payments/verification/verify');
      
      try {
        const response = await api.post<ApiResponse<{ payment: Payment }>>('/payments/verification/verify', data);
        console.log('✅ useVerifyVerificationPayment - Success response:', response.data);
        return response.data;
      } catch (error: any) {
        console.error('❌ useVerifyVerificationPayment - API Error:', error);
        console.error('📋 Error response:', error?.response?.data);
        console.error('📋 Error status:', error?.response?.status);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}

// Hook to initiate Razorpay payment
interface RazorpayPaymentOptions {
  order: RazorpayOrder;
  userInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  description?: string;
  onSuccess: (response: RazorpayVerificationInput) => void;
  onFailure?: (error: Error) => void;
}

export function useRazorpayPayment() {
  const initiatePayment = async ({
    order,
    userInfo,
    description = 'EduTech Course Payment',
    onSuccess,
    onFailure,
  }: RazorpayPaymentOptions) => {
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded || !window.Razorpay) {
      onFailure?.(new Error('Failed to load Razorpay SDK'));
      return;
    }
    
    // Support both backend response formats: { id } or { orderId }
    const orderId = order.id || order.orderId;
    if (!orderId) {
      onFailure?.(new Error('Invalid order: missing order ID'));
      return;
    }
    
    const options: RazorpayOptions = {
      key: order.keyId || RAZORPAY_KEY_ID, // Use keyId from order if available
      amount: order.amount,
      currency: order.currency,
      name: 'Deep Learning EduTech',
      description,
      order_id: orderId,
      handler: (response) => {
        onSuccess({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      prefill: {
        name: userInfo?.name,
        email: userInfo?.email,
        contact: userInfo?.phone,
      },
      theme: {
        color: '#3B82F6',
      },
      modal: {
        ondismiss: () => {
          onFailure?.(new Error('Payment cancelled by user'));
        },
      },
    };
    
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  
  return { initiatePayment };
}
