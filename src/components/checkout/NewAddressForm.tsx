import React, { useState, useCallback } from 'react';
import { AddressAutofill, AddressMinimap, useConfirmAddress } from '@mapbox/search-js-react';
import { Form } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface NewAddressFormProps {
  onSubmit: (addressData: Record<string, any>) => void;
  onCancel: () => void;
  userId: string | number;
}

// Define the shape of the address data received from Mapbox.
interface AddressInfo {
  user_id: string | number;
  house_number: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  latitude: number;
  longitude: number;
  label?: string;
  unit?: string;
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({ onSubmit, onCancel, userId }) => {
  // State for the Mapbox feature (for the minimap)
  const [minimapFeature, setMinimapFeature] = useState<any>(null);
  // useConfirmAddress hook from Mapbox
  const { formRef } = useConfirmAddress({ accessToken: MAPBOX_ACCESS_TOKEN });
  // State for the address information returned by Mapbox
  const [newAddressInfo, setNewAddressInfo] = useState<AddressInfo | null>(null);
  // Controlled fields for additional data
  const [addressLabel, setAddressLabel] = useState<string>('Home');
  const [addressLine2, setAddressLine2] = useState<string>('');

  const mapMode = localStorage.getItem('theme') === 'dark' ? 'night' : 'day';

  // Callback when the autofill retrieves an address (using the first feature)
  const handleAutofillRetrieve = (response: any) => {
    if (response?.features?.length) {
      const info: AddressInfo = {
        user_id: userId,
        house_number: response.features[0].properties.address_number,
        street: response.features[0].properties.street,
        city: response.features[0].properties.place,
        state: response.features[0].properties.region_code,
        postcode: response.features[0].properties.postcode,
        country: response.features[0].properties.country,
        latitude: response.features[0].geometry.coordinates[1],
        longitude: response.features[0].geometry.coordinates[0],
      };
      setNewAddressInfo(info);
      console.log('Retrieved Address Info:', info);
      setMinimapFeature(response.features[0]);
      setTimeout(() => {
        setMinimapFeature((prev: any) => ({ ...prev }));
      }, 0);
    }
  };

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newAddressInfo) {
        console.error('No address data from Mapbox');
        toast({ description: 'No address data found. Please try again.' });
        return;
      }
      const updatedAddressInfo = {
        ...newAddressInfo,
        label: addressLabel,
        unit: addressLine2,
      };
      console.log('Submitting address:', updatedAddressInfo);
      onSubmit(updatedAddressInfo);
    },
    [newAddressInfo, addressLabel, addressLine2, onSubmit]
  );

  return (
    <Card>
      <CardContent className="p-6">
        <h4 className="text-xl font-bold mb-4">Shipping Address</h4>
        <div className="relative">
          <Label htmlFor="address-label">Label</Label>
          <Input
            id="address-label"
            name="address-label"
            value={addressLabel}
            onChange={(e) => setAddressLabel(e.target.value)}
          />
        </div>
        <AddressAutofill accessToken={MAPBOX_ACCESS_TOKEN} onRetrieve={handleAutofillRetrieve}>
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Label htmlFor="address-line1">Address Line 1</Label>
                <Input id="address-line1" name="address-line1" autoComplete="address-line1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="address-line2">Address Line 2</Label>
              <Input
                id="address-line2"
                name="address-line2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="address-level2">City</Label>
                <Input id="address-level2" name="address-level2" autoComplete="address-level2" required />
              </div>
              <div>
                <Label htmlFor="address-level1">State/Region</Label>
                <Input id="address-level1" name="address-level1" autoComplete="address-level1" required />
              </div>
              <div>
                <Label htmlFor="postal-code">ZIP Code</Label>
                <Input id="postal-code" name="postal-code" autoComplete="postal-code" required />
              </div>
            </div>
            {minimapFeature && (
              <div className="mt-4 h-48 w-full rounded-md">
                <AddressMinimap
                  feature={minimapFeature}
                  show={!!minimapFeature}
                  defaultMapStyle={['mapbox', `navigation-guidance-${mapMode}-v4`]}
                  footer={false}
                  accessToken={MAPBOX_ACCESS_TOKEN}
                />
              </div>
            )}
            <div className="flex gap-4 mt-6">
              <Button type="submit">Continue</Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </AddressAutofill>
      </CardContent>
    </Card>
  );
};

export default NewAddressForm;