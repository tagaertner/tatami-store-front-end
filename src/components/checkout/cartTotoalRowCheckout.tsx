// src/components/CartTotalRow.tsx
import { Separator } from '../ui/separator';
import { formatAsDollars } from '../../utils/formatAsDollars';
import {CartTotalRowProps } from '../../utils/types'

export function CartTotalRow({ label, amount, lastRow }: CartTotalRowProps) {
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