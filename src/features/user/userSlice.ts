import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "../../components/ui/use-toast";
import { User, UserState/* , ShippingInfo  */} from "../../utils/types";

// Function to get user data from cookies
const getUserFromCookies = (): User | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === "user_data") {
      try {
        return JSON.parse(atob(decodeURIComponent(value)));
      } catch (error) {
        console.error("Error decoding user cookie:", error);
      }
    }
  }
  return null;
};

// Function to get user from localStorage (fallback)
const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// **Initialize user state** (Cookies -> LocalStorage -> Null)
const initialState: UserState = {
  user: getUserFromCookies() || getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Set cookie for user session
      document.cookie = `user_data=${btoa(JSON.stringify(user))}; path=/; samesite=Lax; secure`;

      // if (!user) {
      //   toast({ description: "Please log in your account" });
      //   return;
      // }
      toast({ description: "Login successful" });
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");

      // ❌ Clear user cookies
      document.cookie = "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    // saveShippingAddress: (state, action: PayloadAction<ShippingInfo>) => {
    //   if (state.user) {
    //     if (!state.user.shippingInfo) {
    //       state.user.shippingInfo = [];
    //     }
    //     // Add id to the address when saving
    //     const addressWithId = {
    //       ...action.payload,
    //       id: crypto.randomUUID(), // Generate unique ID
    //     };
    //     state.user.shippingInfo.push(addressWithId);
    //     localStorage.setItem("user", JSON.stringify(state.user));

    //     // ✅ Update cookies with new user data
    //     document.cookie = `user_data=${btoa(JSON.stringify(state.user))}; path=/; samesite=Lax; secure`;

    //     toast({ description: "Address saved successfully" });
    //   }
    // },
  },
});

export const { loginUser, logoutUser/* , saveShippingAddress  */} = userSlice.actions;

export default userSlice.reducer;

/* import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

export default userSlice.reducer; */