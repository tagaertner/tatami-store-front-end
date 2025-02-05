import { useAppSelector } from '../lib/hooks';
// import { useState } from 'react'; // Add this import
import { CheckoutForm, SectionTitle, CartTotals, CreditCardForm } from '../components';
// import { SavedShippingInfo, } from '../components/checkout/SavedShippingInfo';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
// import { ShippingInfo } from '../utils/types';
import { type ReduxStore } from '../store';

export const loader = (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }
    return null;
  };

const Checkout = () => {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  // const [selectedId, setSelectedId] = useState('');

  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <div className='space-y-8'>
          {/* <SavedShippingInfo
            onSelectShipping={(address: ShippingInfo) => setSelectedId(address.name)}
            selectedShippingId={selectedId}
          /> */}
          <CheckoutForm />
          <CreditCardForm />
        </div>
        <div>
          <CartTotals />
        </div>
      </div>
    </>
  );
};


// export const loader =
//   (store: ReduxStore): LoaderFunction =>
//   async (): Promise<Response | null> => {
//     const user = store.getState().userState.user;
//     if (!user) {
//       toast({ description: 'Please login to continue' });
//       return redirect('/login');
//     }

//     return null;
//   };

// const Checkout = () => {
//   const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
//   if (cartTotal === 0) {
//     return <SectionTitle text='Your cart is empty' />;
//   }
//   return (
//     <>
//       <SectionTitle text='Place your order' />
//       <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>

//         <CheckoutForm />
//         <CartTotals />
//         <CreditCardForm/>
//       </div>
//     </>
//   );
// };
export default Checkout;