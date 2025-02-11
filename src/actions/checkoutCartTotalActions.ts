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

  const errors = validateForm(checkoutData);
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    
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

