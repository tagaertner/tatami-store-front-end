import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../lib/hooks';
import { SectionTitle, CartTotals, CreditCardForm } from '../components';
import NewAddressForm from '../components/checkout/NewAddressForm';
import AddressSelection from '../components/AddressSelection';
import { Address } from '../components/AddressCard';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { type ReduxStore } from '../store';
import { customFetch } from '../utils/customFetch';

export const loader = (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to continue' });
      return redirect('/login');
    }
    return null;
  };

const Checkout: React.FC = () => {
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  const user = useAppSelector((state) => state.userState.user);

  // State for addresses and for showing the NewAddressForm
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  useEffect(() => {
    // Only load addresses if the user exists
    async function loadAddresses() {
      try {
        // Replace with your actual endpoint
        const response = await customFetch.get(`/addresses/user/${user?.id}`);
        const data = await response.data;
        setAddresses(data); // assume data is an array of address objects
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    }
    if (user) {
      loadAddresses();
    }
  }, [user]);

  // Handler when a new address is added via the NewAddressForm
  const handleNewAddressSubmit = async (addressData: Record<string, any>) => {
    try {
      const response = await customFetch.post('/addresses/', addressData);
      const result = await response.data;
      // Assuming the response returns { message: "...", address: { ... } }
      setAddresses((prev) => [...prev, result.address]);
      setShowNewAddressForm(false);
      toast({ description: 'Address added successfully!' });
    } catch (error) {
      console.error('Error creating address:', error);
      toast({ description: 'Failed to add address' });
    }
  };

  // Render a message if the cart is empty.
  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <div className='space-y-8'>
          <div className='rounded-xl border bg-card text-card-foreground shadow p-6'>
            <h2 className='mb-5 text-xl font-bold'>Shipping Information</h2>
            {/* <div className='border rounded-xl p-2 border-gray-900 pb-4'> */}
              <h3 className='mb-4'>Select delivery address:</h3>
              {/* Render the AddressSelection component if addresses exist */}
              {addresses.length > 0 ? (
                <AddressSelection
                  addresses={addresses}
                  onChange={(selectedAddressId) =>
                    console.log('Selected address ID:', selectedAddressId)
                  }
                />
              ) : (
                <p>-- No saved addresses found.</p>
              )}
            {/* </div> */}
            <div className='mt-4'>
              <button
                onClick={() => setShowNewAddressForm(true)}
                className='bg-secondary text-white py-2 px-4 rounded w-full'
              >
                Add a new address
              </button>
            </div>
          </div>

          {/* Conditionally render NewAddressForm */}
          {showNewAddressForm && (
            <NewAddressForm userId={user.id} onSubmit={handleNewAddressSubmit} onCancel={() => setShowNewAddressForm(false)} />
          )}

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