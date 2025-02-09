
import React, { useState, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { AddressAutofill, AddressMinimap, useConfirmAddress } from '@mapbox/search-js-react';
import { Form } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { customFetch } from '../../utils';


const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


interface NewAddressFormProps {
  onSubmit: (addressData: Record<string, any>) => void;
  onCancel: () => void;
}

const NewAddressForm: React.FC<NewAddressFormProps> = ({ onSubmit, onCancel, userId }) => {
  // We'll store the form data after the user fills in the form
  const [formData, setFormData] = useState<FormData | null>(null);
  useEffect(() => {
    console.log("FORM DATA", formData);
  }, [formData]);

  // State to control which page we display
  const [activePage, setActivePage] = useState<'shipping' | 'confirm'>('shipping');
  useEffect(() => {
    console.log("ACTIVE PAGE", activePage);
  }, [activePage]);

  // State to hold the feature from Mapbox (for the minimap)
  const [minimapFeature, setMinimapFeature] = useState<any>(null);
  useEffect(() => {
    console.log("MINIMAP FEATURE", minimapFeature);
  }, [minimapFeature]);

  // useConfirmAddress hook from Mapbox helps confirm/validate address
  const { formRef, showConfirm } = useConfirmAddress({ accessToken: MAPBOX_ACCESS_TOKEN });
  useEffect(() => {
    console.log("FORM REF", formRef);
  }, [formRef]);


  const [newAddressInfo, setNewAddressInfo] = useState<AddressInfo | null>(null);
  const [addressLabel, setAddressLabel] = useState<string>('Home');
  const [addressLine2, setAddressLine2] = useState<string>('');

  const mapMode = localStorage.getItem('theme') === 'dark' ? 'night' : 'day';

  // Callback when the autofill retrieves an address (we use the first feature)
  const handleAutofillRetrieve = (response: any) => {
    if (response?.features?.length) {
      setNewAddressInfo(() => ({
        user_id: userId, /* read id from Redux */
        house_number: response.features[0].properties.address_number,
        street: response.features[0].properties.street,
        city: response.features[0].properties.place,
        state: response.features[0].properties.region_code,
        postcode: response.features[0].properties.postcode,
        country: response.features[0].properties.country,
        latitude: response.features[0].geometry.coordinates[1],
        longitude: response.features[0].geometry.coordinates[0]
      }));
      console.log('REQUEST BODY:', newAddressInfo);

      setMinimapFeature(response.features[0]);
      setTimeout(() => {
        setMinimapFeature((prev) => ({ ...prev }));
      });
    }
  };


  // Handle form submission for the shipping page
  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newAddressInfo) {
        console.error("There is no data from Mapbox");
        return;
      }
      const updatedAddressInfo = {
        ...newAddressInfo,
        label: addressLabel,
        unit: addressLine2,
      };
      console.log("sending to backend:", updatedAddressInfo);
  
      const backEndResp = await customFetch.post('/addresses/', updatedAddressInfo);
      console.log("RESPONSE:", backEndResp);
      if (backEndResp) {
        setFormData(new FormData(e.currentTarget));
        setActivePage('confirm');
      }
    },
    [newAddressInfo, addressLabel, addressLine2]
  );

  // Convert FormData to a plain object
  const convertFormDataToObject = (data: FormData) => {
    const obj: Record<string, any> = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  // Handle final confirmation submission
  const handleConfirmSubmit = () => {
    if (formData) {
      const addressData = convertFormDataToObject(formData);
      onSubmit(addressData);
    }
  };

  // Allow the user to try again (change address)
  const handleTryAgain = () => {
    if (formRef.current) {
      (formRef.current as HTMLFormElement).reset();
    }
    setMinimapFeature(null);
    setActivePage('shipping');
  };

  // Display the address summary from formData for confirmation
  let displayAddress: React.ReactNode = null;
  if (formData) {
    displayAddress = (
      <div className="text-sm text-gray-700">
        <p>{formData.get('address-line1')}</p>
        {formData.get('address-line2') && <p>{formData.get('address-line2')}</p>}
        <p>
          {formData.get('address-level2')}, {formData.get('address-level1')}{' '}
          {formData.get('postal-code')}
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        {activePage === 'shipping' && (
          <div>
            <h4 className="text-xl font-bold mb-4">Shipping Address</h4>
            <div className="relative">
              <Label htmlFor="address-label">Label</Label>
              <Input id="address-label" name="address-label" value={addressLabel} onChange={(e) => setAddressLabel(e.target.value)} />
            </div>
            {/* Address form with Mapbox AddressAutofill */}
            <AddressAutofill accessToken={MAPBOX_ACCESS_TOKEN} onRetrieve={handleAutofillRetrieve}>
              <Form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Label htmlFor="address-line1">Address Line 1</Label>
                    <Input id="address-line1" name="address-line1" autoComplete="address-line1" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address-line2">Address Line 2</Label>
                  <Input id="address-line2" name="address-line2" value={addressLine2} onChange={(e) => { setAddressLine2(e.target.value) }} />
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

                {/* Optional: display a minimap if an address feature was retrieved */}
                {minimapFeature && (
                  <div className="mt-4 h-48 w-full height-100 rounded-md">
                    <AddressMinimap
                      feature={minimapFeature}
                      show={!!minimapFeature}
                      defaultMapStyle={['mapbox', `navigation-guidance-${mapMode}-v4`]}
                      footer={false}
                      accessToken={MAPBOX_ACCESS_TOKEN}
                    />
                  </div>
                )
                }

                <div className="flex gap-4 mt-6">
                  <Button type="submit">Continue</Button>
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </AddressAutofill>
          </div>
        )}

        {activePage === 'confirm' && (
          <div>
            <h4 className="text-xl font-bold mb-4">Address "${addressLabel}" has been created!</h4>
            <div className="mb-4">{displayAddress}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewAddressForm;