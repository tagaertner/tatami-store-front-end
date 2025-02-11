import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchCartItemsAsync } from '../features/cart/cartSlice';

const CartInitializer: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItemsAsync());
    }
  }, [user, dispatch]);

  return null; 
};

export default CartInitializer;