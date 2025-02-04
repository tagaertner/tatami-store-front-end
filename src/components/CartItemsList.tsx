import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { Card } from './ui/card';
import { FirstColumn, SecondColumn, ThirdColumn } from './CartItemColumns';
import { fetchCartItemsAsync } from '../features/cart/cartSlice';

function CartItemsList() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cartState.cartItems);
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    // Load cart items from the backend on mount (or when user changes)
    if (user) {
      dispatch(fetchCartItemsAsync());
    }
  }, [user, dispatch]);

  return (
    <div>
      {cartItems.map((cartItem) => {
        console.log("cartItem >> ", cartItem);
        
        // Destructure product_name and also title if present, then choose one.
        const { cartID, title, price, image, amount, productID } = cartItem;
        return (
          <Card
            key={productID}
            className="flex flex-col gap-y-4 sm:flex-row flex-wrap p-6 mb-8"
          >
          <h3 className="mt-2 text-lg font-semibold inline-block">{title}</h3>
              <div className='inline-block w-full sm:flex sm:items-center'>
                <FirstColumn image={image} title={title} />
                <SecondColumn amount={amount} cartID={cartID} productID={productID}/>
                <ThirdColumn price={price} />
              </div>
          </Card>
        );
      })}
    </div>
  );
}

export default CartItemsList;