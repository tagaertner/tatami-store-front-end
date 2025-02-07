import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCartItemsAsync } from '../features/cart/cartSlice';

const CartInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    // If user is logged in, load the cart from the backend.
    if (user) {
      dispatch(fetchCartItemsAsync());
    }
  }, [user, dispatch]);

  return null; // This component does not render any UI
};

export default CartInitializer;