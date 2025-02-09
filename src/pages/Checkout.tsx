import { useAppSelector } from '../lib/hooks';
import { SectionTitle, CartTotals, CreditCardForm } from '../components';
import NewAddressForm from '../components/checkout/NewAddressForm';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { type ReduxStore } from '../store';
import AddressSelection from '../components/AddressSelection';
import { Address } from '../components/AddressCard';
import { CardTitle } from '../components/ui/card';



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

  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  const dummyAddresses: Address[] = [
    {
      id: '1h',
      label: 'Home',
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA'
    },
    {
      id: '2o',
      label: 'Office',
      street: '456 Corporate Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90012',
      country: 'USA'
    },
  ];

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <div className='space-y-8'>
          <div className='rounded-xl border bg-card text-card-foreground shadow p-6'>
            <CardTitle className='mb-5'>Shipping Information</CardTitle>
            <h3 className='p-2'>Select delivery address</h3>
            <AddressSelection addresses={dummyAddresses} onChange={(selectedAddressId) => console.log(selectedAddressId)} />
          </div>
          <NewAddressForm />
          <CreditCardForm />
        </div>
        <div>
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default Checkout;