// src/actions/checkoutActions.ts
import { ActionFunction, ActionFunctionArgs, redirect } from 'react-router-dom';
import { ShippingInfo } from '../utils/types';
import { ReduxStore } from '../store'
import { saveShippingAddress } from '../features/user/userSlice';


export const checkoutAction = 
  (store: ReduxStore) => {
    const actionFunction: ActionFunction = async ({ request }: ActionFunctionArgs) => {
      try {
        const formData = await request.formData();
        
        const shipping: ShippingInfo = {  
          name: formData.get('name') as string,
          address: formData.get('address') as string,
          address2: formData.get('address2') as string || null,
          city: formData.get('city') as string,
          state: formData.get('state') as string,
          zipCode: formData.get('zipCode') as string
        };
        // Update in your checkoutAction
        const saveAddress = formData.get('saveAddress');

        if (saveAddress) {
          store.dispatch(saveShippingAddress(shipping));
}
        store.dispatch(saveShippingAddress(shipping));
        
        // Return to the checkout page to show the saved address
        return redirect('/checkout');
      } catch (error) {
        console.error('Checkout error:', error);
        return { error: (error as Error).message };
      }
    };

    return actionFunction;
  };
// export const checkoutAction = async ({ request }: ActionFunctionArgs) => {
//   try {
//     const formData = await request.formData();
//     const saveAddress = formData.get('saveAddress');
    
//     const shipping: ShippingInfo = {  
//       name: formData.get('name') as string,
//       address: formData.get('address') as string,
//       address2: formData.get('address2') as string || null,
//       city: formData.get('city') as string,
//       state: formData.get('state') as string,
//       zipCode: formData.get('zipCode') as string
//     };

//     // Validate required fields
//     const requiredFields = ['name', 'address', 'city', 'state', 'zipCode'];
//     for (const field of requiredFields) {
//       if (!shipping[field as keyof ShippingInfo]) {
//         throw new Error(`${field} is required`);
//       }
//     }

//     if (saveAddress) {
//       // Add logic to save the shipping address
//       console.log('Address saved:', shipping);
//       // You'll want to dispatch a Redux action here to save the address
//     }

//     // Store shipping info in state or send to API
//     console.log('Shipping info:', shipping);

//     // Store shipping info in state or send to API
//     console.log('Shipping info:', shipping);
    
//     return redirect('/next-step');
//   } catch (error) {
//     console.error('Checkout error:', error);
//     return { error: (error as Error).message };
//   }
// };
