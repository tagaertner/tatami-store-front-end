import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../lib/hooks';
import { SectionTitle, CartTotals } from '../components';
import NewAddressForm from '../components/checkout/NewAddressForm';
import AddressSelection from '../components/AddressSelection';
import { Address } from '../components/AddressCard';
import CreditCardForm from '../components/checkout/CreditCardForm';
import { LoaderFunction, redirect, useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { type ReduxStore } from '../store';
import { customFetch } from '../utils/customFetch';
import { clearCart } from '../features/cart/cartSlice';
import { useAppDispatch } from '../lib/hooks';

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
  const navigate = useNavigate();
  const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
  const user = useAppSelector((state) => state.userState.user);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
 
  useEffect(() => {
    async function loadAddresses() {
      if (!user?.id) return;
      try {
        const response = await customFetch.get(`/addresses/user/${user.id}`);
        const data = response.data; // assume data is an array of address objects
        setAddresses(data);
      } catch (error) {
        console.error('Error loading addresses:', error);
      }
    }
    loadAddresses();
  }, [user]);

    const dispatch = useAppDispatch();
  

  // Handler when a new address is submitted from NewAddressForm
  const handleNewAddressSubmit = async (addressData: Record<string, any>) => {
    try {
      const response = await customFetch.post('/addresses/', addressData);
      setAddresses((prev) => [...prev, response.data.address]);
      setShowNewAddressForm(false);
      toast({ description: 'Address added successfully!' });
    } catch (error) {
      console.error('Error creating address:', error);
      toast({ description: 'Failed to add address' });
    }
  };
 
  const handlePaymentSuccess = async () => {
    if (!selectedAddressId) {
      toast({ description: 'Please select a delivery address before processing payment.' });
      return;
    }
    try {
      // Create the order using your customFetch; adjust the endpoint as needed.
      const response = await customFetch.post('/orders/', {
        user_id: user?.id,
        address_id: selectedAddressId,
      });
      toast({ description: 'Order placed successfully!' });
      dispatch(clearCart());
      navigate('/order-confirmation', { state: { orderDetails: response.data } }); ;
    } catch (error) {
      console.error('Error creating order:', error);
      toast({ description: 'Order creation failed.' });
    }
  };
 
  if (cartTotal === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
 
  if (!user) return null;
 
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <div className="space-y-8">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <h2 className="mb-5 text-xl font-bold">Shipping Information</h2>
            <h3 className="mb-4">Select delivery address:</h3>
            {addresses.length > 0 ? (
              <AddressSelection
                addresses={addresses}
                onChange={(id) => {
                  setSelectedAddressId(id);
                }}
              />
            ) : (
              <p>-- No saved addresses found.</p>
            )}
            {addresses.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowNewAddressForm((prev) => !prev)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded w-full"
                >
                  {showNewAddressForm ? 'Hide new address form' : 'Add a new address'}
                </button>
              </div>
            )}
          </div>
 
          {(addresses.length === 0 || showNewAddressForm) && user?.id && (
            <NewAddressForm
              userId={user.id as string}
              onSubmit={handleNewAddressSubmit}
              onCancel={() => setShowNewAddressForm(false)}
            />
          )}
        </div>
        <div className="space-y-8">
          <CartTotals />
          {selectedAddressId !== null && (
            <CreditCardForm onPaymentSuccess={handlePaymentSuccess} />
          )}
        </div>
      </div>
    </>
  );
 };
 
 export default Checkout;


// export const loader = (store: ReduxStore): LoaderFunction =>
//   async (): Promise<Response | null> => {
//     const user = store.getState().userState.user;
//     if (!user) {
//       toast({ description: 'Please login to continue' });
//       return redirect('/login');
//     }
//     return null;
//   };

// const Checkout: React.FC = () => {
//   const navigate = useNavigate();
//   const cartTotal = useAppSelector((state) => state.cartState.cartTotal);
//   const user = useAppSelector((state) => state.userState.user);

//   // Ensure user exists (the loader should redirect if not)
//   if (!user) return null;

//   // State for addresses, selected address, and controlling NewAddressForm visibility
//   const [addresses, setAddresses] = useState<Address[]>([]);
//   const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
//   const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);

//   // Load addresses from backend when the component mounts
//   useEffect(() => {
//     async function loadAddresses() {
//       try {
//         const response = await customFetch.get(`/addresses/user/${user.id}`);
//         const data = response.data; // assume data is an array of address objects
//         console.log('Loaded addresses:', data);
//         setAddresses(data);
//       } catch (error) {
//         console.error('Error loading addresses:', error);
//       }
//     }
//     loadAddresses();
//   }, [user]);

//   // Handler when a new address is submitted from NewAddressForm
//   const handleNewAddressSubmit = async (addressData: Record<string, any>) => {
//     try {
//       const response = await customFetch.post('/addresses/', addressData);
//       const result = response.data; // expected to be { message: string, address: Address }
//       setAddresses((prev) => [...prev, result.address]);
//       // Hide the form after successful submission.
//       setShowNewAddressForm(false);
//       toast({ description: 'Address added successfully!' });
//     } catch (error) {
//       console.error('Error creating address:', error);
//       toast({ description: 'Failed to add address' });
//     }
//   };

//   // Handle payment success by creating the order if an address is selected
//   const handlePaymentSuccess = async (paymentMethod: any) => {
//     if (!selectedAddressId) {
//       toast({ description: 'Please select a delivery address before processing payment.' });
//       return;
//     }
//     try {
//       console.log('Received payment method token:', paymentMethod.id);
//       // Create the order using your customFetch; adjust the endpoint as needed.
//       const response = await customFetch.post('/orders/', {
//         user_id: user.id,
//         address_id: selectedAddressId,
//       });
//       console.log('Order created:', response.data);
//       toast({ description: 'Order placed successfully!' });
//       // dispatch(clearCart());
//       navigate('/order-confirmation', { state: { orderDetails: response.data } }); ;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       toast({ description: 'Order creation failed.' });
//     }
//   };

//   // If cart is empty, display a message
//   if (cartTotal === 0) {
//     return <SectionTitle text="Your cart is empty" />;
//   }

//   return (
//     <>
//       <SectionTitle text="Place your order" />
//       <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
//         <div className="space-y-8">
//           <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
//             <h2 className="mb-5 text-xl font-bold">Shipping Information</h2>
//             <h3 className="mb-4">Select delivery address:</h3>
//             {addresses.length > 0 ? (
//               <AddressSelection
//                 addresses={addresses}
//                 onChange={(id) => {
//                   setSelectedAddressId(id);
//                   console.log('Selected address ID:', id);
//                 }}
//               />
//             ) : (
//               <p>-- No saved addresses found.</p>
//             )}
//             {/* If there are existing addresses, show a toggle button */}
//             {addresses.length > 0 && (
//               <div className="mt-4">
//                 <button
//                   onClick={() => setShowNewAddressForm((prev) => !prev)}
//                   className="bg-secondary text-white py-2 px-4 rounded w-full"
//                 >
//                   {showNewAddressForm ? 'Hide new address form' : 'Add a new address'}
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Always render the form if no addresses exist; otherwise render if toggled on */}
//           {(addresses.length === 0 || showNewAddressForm) && (
//             <NewAddressForm
//               userId={user.id}
//               onSubmit={handleNewAddressSubmit}
//               onCancel={() => setShowNewAddressForm(false)}
//             />
//           )}
//         </div>
//         <div className="space-y-8">
//           <CartTotals />
//           {/* Pass the payment success callback to CreditCardForm */}
//          { (selectedAddressId !== null) && (<CreditCardForm onPaymentSuccess={handlePaymentSuccess} />)}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Checkout;

//  3red time

