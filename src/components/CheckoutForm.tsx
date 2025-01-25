import { ActionFunction, Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatAsDollars, type Checkout } from '../utils';
import { toast } from '../components/ui/use-toast';
import { clearCart } from '../features/cart/cartSlice';
import { ReduxStore } from '../store';
import { setOrderDetails } from '../features/order/orderSlice';


export const action = 
    (store:ReduxStore):ActionFunction =>
    async ({ request }): Promise<null | Response> =>{
      const formData = await request.formData();
      const name = formData.get('name') as string;
      const address = formData.get('address') as string;

      if (!name || !address) {
        toast({ description: 'please fill out all fields' });
        return null;
      }
      const user = store.getState().userState.user;
      if (!user) {
        toast({ description: 'please login to place an order' });
        return redirect('/login');
      }
      const { cartItems, orderTotal, numItemsInCart } =
        store.getState().cartState;

        const info: Checkout = {
          name,
          address,
          chargeTotal: orderTotal,
          orderTotal: formatAsDollars(orderTotal),
          cartItems,
          numItemsInCart,
        };
        try {
          await customFetch.post(
            '/orders',
            { data: info },
            {
              headers: {
                Authorization: `Bearer ${user.jwt}`,
              },
            }
          );
          store.dispatch(clearCart());
          store.dispatch(setOrderDetails(info)); 
          toast({ description: 'order placed successfully!' });
          return redirect('/order-confirmation');
        } catch (error) {
          console.log(error)
          toast({ description: 'order failed' });
          return null;
        }
  };

  function CheckoutForm() {
    return (
      <div className="space-y-8">
        <Form method='post' className='flex flex-col gap-y-4'>
          <h4 className='font-medium text-xl mb-4'>Shipping Information</h4>
          <FormInput label='first name' name='name' type='text'/>
          <FormInput label='last name' name='name' type='text'/>
          <FormInput label='address' name='address' type='text'/>
        </Form>
  
        <Form className='flex flex-col gap-y-4'>
          <h4 className='font-medium text-xl mb-4'>Payment Information</h4>
          <FormInput label='Card Number' name='cardNumber' type='text' placeholder='1234 5678 9012 3456'/>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label='Expiry Date' name='expiry' type='text' placeholder='MM/YY'/>
            <FormInput label='CVV' name='cvv' type='text' placeholder='123'/>
          </div>
          <div className="mt-4">
            <SubmitBtn text='Place Your Order' />
          </div>
        </Form>
      </div>
    );
  }
  
  export default CheckoutForm