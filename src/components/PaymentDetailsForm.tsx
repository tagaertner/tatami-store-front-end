// PaymentDetailsForm.tsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';

interface PaymentDetailsFormProps {
  onPaymentSuccess?: (paymentMethod: any) => void;
}

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({ description: 'Card element not found.' });
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error('Error creating payment method:', error);
      toast({ description: error.message });
    } else {
      toast({ description: 'Payment method created successfully!' });
      if (onPaymentSuccess) {
        onPaymentSuccess(paymentMethod);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#dfe1f0',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? 'Processing…' : 'Submit Payment'}
      </Button>
    </form>
  );
};

export default PaymentDetailsForm;