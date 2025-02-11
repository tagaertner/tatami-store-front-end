// CreditCardForm.tsx
// import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentDetailsForm from '../PaymentDetailsForm';
interface CreditCardFormProps {
  onPaymentSuccess: (paymentMethod: any) => void;
}

function CreditCardForm({ onPaymentSuccess }: CreditCardFormProps) {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your credit card information</CardDescription>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise}>
          <PaymentDetailsForm onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      </CardContent>
    </Card>
  );
}

export default CreditCardForm;