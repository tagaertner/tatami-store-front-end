import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Checkout } from '../../utils';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null as Checkout | null
  },
  reducers: {
    setOrderDetails: (state, action: PayloadAction<Checkout>) => {
      state.orderDetails = action.payload;
    }
  }
});

export const { setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
