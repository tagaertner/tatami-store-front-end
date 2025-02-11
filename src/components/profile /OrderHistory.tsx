import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <Package className="h-6 w-6" />
          <h3 className="text-xl font-semibold">Order History</h3>
        </div>
      </CardHeader>
      <CardContent className="flex justify-end">
        <Button asChild>
          <Link to="/orders">View Orders</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;