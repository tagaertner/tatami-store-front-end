import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { Card } from './ui/card';
import { FirstColumn, SecondColumn, ThirdColumn } from './CartItemColumns';
import { fetchCartItemsAsync } from '../features/cart/cartSlice';

function CartItemsList() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartState.cartItems);  
  
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsAsync());
    }
  }, [user, dispatch]);

  return (
    <div>
      {cartItems.map((cartItem) => {        
        const { title, price, image, amount, productID, availableStock} = cartItem;
        
        return (
          <Card
            key={productID}
            className="flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8"
          >
          <h3 className="mt-2 text-lg font-semibold inline-block">{title}</h3>
              <div className='inline-block w-full sm:flex sm:items-center'>
                <FirstColumn image={image} title={title} />
                <SecondColumn amount={amount} productID={productID} stock={availableStock}/>
                <ThirdColumn price={price} />
              </div>
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;