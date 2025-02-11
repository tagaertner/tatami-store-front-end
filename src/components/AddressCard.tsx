import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  house_number: string;
  unit: string;
}
interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: (id: string) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, selected, onSelect }) => {
  return (
    <Card
      onClick={() => onSelect(address.id)}
      className={`cursor-pointer transition-colors hover:bg-secondary ${
        selected ? 'border-2 border-primary' : 'border border-gray-500'
      }`}
    >
      <CardHeader className="py-0 my-2">
        <CardTitle className="text-lg font-bold">{address.label}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-gray-400 my-2 py-0">
        <p>
          {address.house_number} {address.street}, {address.unit}, {address.city}, {address.zip} {address.state}, {address.country}
        </p>
      </CardContent>
    </Card>
  );
};

export default AddressCard;