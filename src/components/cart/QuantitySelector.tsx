import * as React from 'react';
import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input.tsx';
import { Minus, Plus } from 'lucide-react';

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number, stock: number) => void;
  max: number;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange, max }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1, max);
    }
  };
  
  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1, max);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleDecrement} disabled={value <= 1} variant="outline">
        <Minus className="w-4 h-4" />
      </Button>
      <Input type="number" value={value} readOnly className="w-16 text-center" />
      <Button onClick={handleIncrement} disabled={value >= max} variant="outline">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;