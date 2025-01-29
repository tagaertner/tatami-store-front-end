import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from '../../components/ui/use-toast'
import { User, UserState, ShippingInfo } from '../../utils/types';




const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));

      if (user.username === 'demo user') {
        toast({ description: 'Welcome Guest User' });
        return;
      }
      toast({ description: 'Login successful' });
    },
    logoutUser: (state) => {
      state.user = null;
      // localStorage.clear()
      localStorage.removeItem('user');
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingInfo>) => {
      if (state.user) {
        if (!state.user.shippingInfo) {
          state.user.shippingInfo = [];
        }
        // Add id to the address when saving
        const addressWithId = {
          ...action.payload,
          id: crypto.randomUUID() // Generate unique ID
        };
        state.user.shippingInfo.push(addressWithId);
        localStorage.setItem('user', JSON.stringify(state.user));
        toast({ description: 'Address saved successfully' });
      }
    },
  },
});


export const { loginUser, logoutUser, saveShippingAddress} = userSlice.actions;

export default userSlice.reducer;