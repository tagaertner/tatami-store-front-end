import React, { useState } from 'react';
import AddressCard, { Address } from './AddressCard';

interface AddressSelectionProps {
  addresses: Address[];
  onChange: (selectedAddressId: string) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ addresses, onChange }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);  

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange(id);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          selected={address.id === selectedId}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default AddressSelection;