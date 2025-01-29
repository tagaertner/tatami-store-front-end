import { CheckoutFormData } from './../utils'

export const validateForm = (data: CheckoutFormData) => {
  const errors: Partial<Record<keyof CheckoutFormData, string>> = {};
  
  if (!data.cardNumber.match(/^\d{16}$/)) {
    errors.cardNumber = 'Invalid card number';
  }
  if (!data.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    errors.expiry = 'Invalid expiry date';
  }
  if (!data.cvc.match(/^\d{3}$/)) {
    errors.cvc = 'Invalid CVC';
  }
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  return errors;
};

 