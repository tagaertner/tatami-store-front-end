import { useAppSelector } from '../../lib/hooks';
import { formatAsDollars } from '../../utils';
import { Card, CardTitle } from '../../components/ui/card';
import { Separator } from '../ui/separator';

function CartTotals() {
  const { cartTotal, tax, orderTotal } = useAppSelector(
    (state) => state.cartState
  );

  return (
    <Card className='w-full max-w-md m-auto p-12 bg-muted scale-122'>
      <CartTotalRow label='Subtotal' amount={cartTotal} />
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