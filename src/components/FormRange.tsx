import { formatAsDollars } from '../utils';
import { useState } from 'react';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { FormRangeProps } from '../utils';

function FormRange({ name, label, defaultValue }: FormRangeProps) {
  const step = 10;
  const maxPrice = 1000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize flex justify-between'>
        {label || name}
        <span>{formatAsDollars(selectedPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className='mt-4'
      />
    </div>
  );
}
export default FormRange;