import { Form } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { states } from '../../data/states';


function NewAddressForm() {

  return (
    <Card>
      <CardContent className='pt-6'>
        <Form method='POST' className='space-y-4'>

          <div className='space-y-2'>
            <Label htmlFor='address1'>Address Line 1</Label>
            <Input 
              id='address1' 
              name='address' 
              placeholder='Street Address'
              // defaultValue={defaultAddress?.address || ''}
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
              <Input 
                id='city' 
                name='city' 
                required 
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Select name='state'>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
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

          <Button asChild className='mt-8 w-full'>
            <Link to='/save-address'>Save Address</Link>
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NewAddressForm;