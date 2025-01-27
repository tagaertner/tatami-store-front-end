import { useAppSelector } from '../../lib/hooks';
import { formatAsDollars } from '../../utils';
import { Card, CardTitle } from '../../components/ui/card';
import { Separator } from '../ui/separator';
import { ReduxStore } from '../../store';

interface CheckoutFormData {
  cardNumber: string;
  expiry: string; 
  cvc: string;
  name: string;
}

const validateForm = (data: CheckoutFormData) => {
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

export const action = (store: ReduxStore) => async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const { cartState } = store.getState();
  const { cartTotal, shipping, tax, orderTotal } = cartState;

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
      orderDetails: { cartTotal, shipping, tax, orderTotal }
    };
  } catch (error) {
    console.log(error)
    return { 
      success: false,
      error: 'Payment processing failed'
    };
  }
};

 
function CartTotals() {
  const { cartTotal, shipping, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className='w-full max-w-4xl p-12 bg-muted scale-122'>
      <CartTotalRow label='Subtotal' amount={cartTotal} />
      <CartTotalRow label='Shipping' amount={shipping} />
      <CartTotalRow label='Tax' amount={tax} />
      <CardTitle className='mt-8'>
        <CartTotalRow label='Order Total' amount={orderTotal} lastRow />
      </CardTitle>
    </Card>
  );
};

function CartTotalRow({
  label,
  amount,
  lastRow,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className='flex justify-between text-sm'>
        <span>{label}</span>
        <span>{formatAsDollars(amount)}</span>
      </p>
      {lastRow ? null : <Separator className='my-2' />}
    </>
  );
}

export default CartTotals;