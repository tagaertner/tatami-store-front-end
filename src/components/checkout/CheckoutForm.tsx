import { Form } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { states } from '../../data/states';
import { useAppSelector } from '../../lib/hooks';


function CheckoutForm() {
  // Get the user's default or first saved address
  const savedAddresses = useAppSelector((state) => state.userState.user?.shippingInfo || []);
  const defaultAddress = savedAddresses.find(addr => addr.isDefault) || savedAddresses[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method='POST' className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input 
              id='name' 
              name='name' 
              placeholder='John Doe' 
              defaultValue={defaultAddress?.name || ''}
              required 
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address1'>Address Line 1</Label>
            <Input 
              id='address1' 
              name='address' 
              placeholder='Street Address'
              defaultValue={defaultAddress?.address || ''}
              required 
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address2'>Address Line 2</Label>
            <Input 
              id='address2' 
              name='address2' 
              placeholder='Apt, Suite, Unit'
              defaultValue={defaultAddress?.address2 || ''}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input 
                id='city' 
                name='city' 
                defaultValue={defaultAddress?.city || ''}
                required 
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Select name='state' defaultValue={defaultAddress?.state || ''}>
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
              defaultValue={defaultAddress?.zipCode || ''}
              required 
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="saveAddress" 
              name="saveAddress" 
            />
            <Label htmlFor="saveAddress">Save this address for future orders</Label>
          </div>

          <Button asChild className='mt-8 w-full'>
            <Link to='/save-address'>Save Address</Link>
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

// function CheckoutForm() {
  
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Shipping Information</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Form method='POST' className='space-y-4'>
//           <div className='space-y-2'>
//             <Label htmlFor='name'>Full Name</Label>
//             <Input id='name' name='name' placeholder='John Doe' required />
//           </div>

//           <div className='space-y-2'>
//             <Label htmlFor='address1'>Address Line 1</Label>
//             <Input 
//               id='address1' 
//               name='address' 
//               placeholder='Street Address'
//               required 
//             />
//           </div>

//           <div className='space-y-2'>
//             <Label htmlFor='address2'>Address Line 2</Label>
//             <Input 
//               id='address2' 
//               name='address2' 
//               placeholder='Apt, Suite, Unit'
//             />
//           </div>

//           <div className='grid grid-cols-2 gap-4'>
//             <div className='space-y-2'>
//               <Label htmlFor='city'>City</Label>
//               <Input id='city' name='city' required />
//             </div>

//             <div className='space-y-2'>
//               <Label htmlFor='state'>State</Label>
//               <Select name='state'>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select state" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {states.map((states) => (
//                     <SelectItem key={states.value} value={states.value}>
//                       {states.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className='w-1/3'>
//             <Label htmlFor='zipCode'>ZIP Code</Label>
//             <Input 
//               id='zipCode' 
//               name='zipCode' 
//               maxLength={5}
//               required 
//             />
//           </div>

//           {/* save address */}

//           {/* <div className="flex items-center space-x-2">
//             <Checkbox id="saveAddress" name="saveAddress" />
//             <Label htmlFor="saveAddress">Save this address for future orders</Label>
//          </div> */}

      
//           <Button asChild className='mt-8 w-full'>
//                <Link to='/save-address'>Save Address</Link>
//              </Button>
//           <div/>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }



export default CheckoutForm;