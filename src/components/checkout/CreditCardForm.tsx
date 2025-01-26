
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';


function CreditCardForm() {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your credit card information</CardDescription>
      </CardHeader>
      <CardContent>
        <form className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='cardNumber'>Card Number</Label>
            <Input 
              id='cardNumber'
              placeholder='1234 5678 9012 3456'
              type='text'
              maxLength={19}
            />
          </div>
          
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='expiry'>Expiry Date</Label>
              <Input 
                id='expiry'
                placeholder='MM/YY'
                type='text'
                maxLength={5}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cvc'>CVC</Label>
              <Input 
                id='cvc'
                placeholder='123'
                type='text'
                maxLength={3}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='name'>Cardholder Name</Label>
            <Input 
              id='name'
              placeholder='John Doe'
              type='text'
            />
          </div>

          <Button type='submit' className='w-full'>
            Place Your Order
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default CreditCardForm;