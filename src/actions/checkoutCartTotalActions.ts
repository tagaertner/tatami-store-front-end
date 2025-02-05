// src/actions/checkoutActions.ts
import { ReduxStore } from '../store';
import { CheckoutFormData } from '../utils/types';
import { validateForm} from '../utils/validation';


 export const checkoutCartTotalAction= (store: ReduxStore) => async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const { cartState } = store.getState();
  const { cartTotal, tax, orderTotal } = cartState;

  const checkoutData: CheckoutFormData = {
    cardNumber: formData.get('cardNumber') as string,
    expiry: formData.get('expiry') as string,
    cvc: formData.get('cvc') as string, 
    name: formData.get('name') as string
  };

  // Validate form
  const errors = validateForm(checkoutData);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    // Here you would:
    // 1. Send payment info to payment processor
    // 2. Create order in database
    // 3. Clear cart
    // 4. Redirect to success page
    
    return { 
      success: true, 
      orderDetails: { cartTotal, tax, orderTotal }
    };
  } catch (error) {
    console.log(error)
    return { 
      success: false,
      error: 'Payment processing failed'
    };
  }
};

