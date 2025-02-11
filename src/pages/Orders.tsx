import React from 'react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
import { customFetch } from '../utils/customFetch';
import { SectionTitle } from '../components';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ReduxStore } from '../store';

export interface Order {
  order_id: string;
  user_id: string;
  address_id: number;
  total_amount: number;
  order_date: string;
  status: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

// Loader-функция проверяет, авторизован ли пользователь, и запрашивает его заказы
export const loader = (store: ReduxStore): LoaderFunction => async ({ request }): Promise<Order[] | Response | null> => {
  const user = store.getState().userState.user;
  if (!user) {
    toast({ description: 'Please login to continue' });
    return redirect('/login');
  }
  try {
    const response = await customFetch.get(`/orders/${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast({ description: 'Failed to fetch orders' });
    return null;
  }
};

const Orders: React.FC = () => {
  const orders = useLoaderData() as Order[];

  if (!orders || orders.length === 0) {
    return <SectionTitle text="No orders found. Please make an order." />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <SectionTitle text="Your Orders" />
      <div className="grid grid-cols-1 gap-6 mt-6">
        {orders.map((order) => (
          <Card key={order.order_id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Order #{order.order_id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(order.order_date).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Total: ${order.total_amount.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {order.status}
              </p>
              {order.items && order.items.length > 0 && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Items:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product_name} x {item.quantity} (${(item.price * item.quantity).toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;