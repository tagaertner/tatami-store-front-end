import { useAppSelector } from '../lib/hooks';
import { SectionTitle } from '../components';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { LoaderFunction, redirect} from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { type ReduxStore } from '../store';

export const loader =
  (store: ReduxStore): LoaderFunction =>
  async (): Promise<Response | null> => {
    const user = store.getState().userState.user;
    if (!user) {
      toast({ description: 'Please login to view order confirmation' });
      return redirect('/login');
    }
    return null;
  };

const OrderConfirmation = () => {
  const { orderDetails } = useAppSelector((state) => state.orderState);
  const { user } = useAppSelector((state) => state.userState);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <SectionTitle text="Order Confirmation"/>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            Thank you for your order, {user?.first_name}!
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/orders">View Previous Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;