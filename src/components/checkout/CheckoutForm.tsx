import { Form } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { states } from '../../data/states';
import { redirect, ActionFunctionArgs } from 'react-router-dom';
// import { useToast} from '../../components/ui/use-toast';

interface ShippingInfo {
  name: string;
  address: string;
  address2?: string | null;
  city: string;
  state: string;
  zipCode: string;
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const shipping: ShippingInfo = {  
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      address2: formData.get('address2') as string || null,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zipCode: formData.get('zipCode') as string
    };

    // Validate required fields
    const requiredFields = ['name', 'address', 'city', 'state', 'zipCode'];
    for (const field of requiredFields) {
      if (!shipping[field as keyof ShippingInfo]) {
        throw new Error(`${field} is required`);
       
      }
    }

    // Store shipping info in state or send to API
    console.log('Shipping info:', shipping);
    
    return redirect('/next-step');
  } catch (error) {
    console.error('Checkout error:', error);
    return { error: (error as Error).message };
  }
};

function CheckoutForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method='POST' className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input id='name' name='name' placeholder='John Doe' required />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address1'>Address Line 1</Label>
            <Input 
              id='address1' 
              name='address' 
              placeholder='Street Address'
              required 
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address2'>Address Line 2</Label>
            <Input 
              id='address2' 
              name='address2' 
              placeholder='Apt, Suite, Unit'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input id='city' name='city' required />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Select name='state'>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((states) => (
                    <SelectItem key={states.value} value={states.value}>
                      {states.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='w-1/3'>
            <Label htmlFor='zipCode'>ZIP Code</Label>
            <Input 
              id='zipCode' 
              name='zipCode' 
              maxLength={5}
              required 
            />
          </div>

          {/* <div className='mt-6'>
            <SubmitBtn text='Place Your Order' />
          </div> */}
        </Form>
      </CardContent>
    </Card>
  );
}

export default CheckoutForm;