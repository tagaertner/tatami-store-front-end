import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../../utils';
import { toast } from '../../components/ui/use-toast';
import { customFetch } from '../../utils/customFetch';
import type { RootState } from '../../store';

// Default cart state
const defaultState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  tax: 0,
  orderTotal: 0,
};

// Thunk to fetch the current cart items from the backend for the authenticated user.
export const fetchCartItemsAsync = createAsyncThunk<
  CartItem[],
  void,
  { state: RootState }
>(
  'cart/fetchCartItemsAsync',
  async (_, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    if (!user) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }
    try {
      const response = await customFetch.get(`/cart/${user.cognito_id}`);
      // Assume the backend returns an array of cart items with keys:
      // cartID, productID, title, amount, price, image
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

// Thunk to remove a cart item from the backend.
// Now it accepts a productID (as a string) and returns that productID upon successful deletion.
export const removeItemFromCartAsync = createAsyncThunk<
  string, // Return: the productID of the removed item
  string, // Argument: the productID of the item to remove
  { state: RootState }
>(
  'cart/removeItemFromCartAsync',
  async (productId, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    if (!user) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }
    try {
      // Call backend DELETE endpoint: /cart/<user_id>/<product_id>
      await customFetch.delete(`/cart/${user.cognito_id}/${productId}`);
      return productId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

// Thunk to add an item to the cart for an authenticated user.
// The thunk receives a full CartItem (with extra FE fields) and returns a full CartItem.
export const addItemToCartAsync = createAsyncThunk<
  CartItem,   // Return type: full CartItem with extra FE details
  CartItem,   // Argument type: full CartItem provided from FE
  { state: RootState }
>(
  'cart/addItemToCartAsync',
  async (cartItem, thunkAPI) => {
    const user = thunkAPI.getState().userState.user;
    if (!user) {
      return thunkAPI.rejectWithValue("User is not authenticated");
    }
    const userId = user.cognito_id;
    console.log("userId", userId);
    console.log("productID", cartItem.productID);
    console.log("amount", cartItem.amount);
    try {
      // Call the backend with minimal data required: product_id and quantity.
      const response = await customFetch.post(`/cart/${userId}`, {
        product_id: cartItem.productID,
        quantity: cartItem.amount,
      });
      
      // Assume response.data returns an object like: 
      // { cartID: string, productId: string, amount: number }
      // Merge backend returned minimal data with extra properties from the original cartItem.
      return {
        cartID: response.data.cartID,       // generated cart ID from backend
        productID: cartItem.productID,        // product identifier
        amount: response.data.amount,         // quantity updated by backend (or same as cartItem.amount)
        image: cartItem.image,                // extra rendering info
        title: cartItem.title,                // extra rendering info
        price: cartItem.price,                // extra rendering info
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

// Retrieve cart state from localStorage as fallback.
const getCartFromLocalStorage = (): CartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    // Reducer to set cart items in state from backend.
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      // Recalculate totals
      let total = 0;
      let numItems = 0;
      state.cartItems.forEach((item) => {
        total += Number(item.price) * item.amount;
        numItems += item.amount;
      });
      state.cartTotal = total;
      state.numItemsInCart = numItems;
      state.tax = 0.1 * total;
      state.orderTotal = total + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newCartItem = action.payload;
      const item = state.cartItems.find((i) => i.cartID === newCartItem.cartID);
      if (item) {
        item.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }
      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Item added to cart' });
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const cartID = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return;
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= cartItem.amount;
      state.cartTotal -= Number(cartItem.price) * cartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Item removed from the cart' });
    },
    editItem: (
      state,
      action: PayloadAction<{ cartID: string; amount: number }>
    ) => {
      const { cartID, amount } = action.payload;
      const cartItem = state.cartItems.find((i) => i.cartID === cartID);
      if (!cartItem) return;
      state.numItemsInCart += amount - cartItem.amount;
      state.cartTotal += Number(cartItem.price) * (amount - cartItem.amount);
      cartItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Amount updated' });
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItemToCartAsync.fulfilled, (state, action) => {
      // The backend returns the cart item (or an updated version).
      const newCartItem = action.payload;
      console.log("newCartItem (action.payload) >> ", newCartItem);
      const existing = state.cartItems.find((i) => i.cartID === newCartItem.cartID);
      if (existing) {
        existing.amount += newCartItem.amount;
      } else {
        state.cartItems.push(newCartItem);
      }
      state.numItemsInCart += newCartItem.amount;
      state.cartTotal += Number(newCartItem.price) * newCartItem.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast({ description: 'Item added to cart (server)' });
    });
    builder.addCase(addItemToCartAsync.rejected, (state, action) => {
      toast({ description: 'Failed to add item to cart' });
    });
    builder.addCase(removeItemFromCartAsync.fulfilled, (state, action) => {
      const removedProductId = action.payload;
      // Remove the item where productID matches the removed product id.
      const cartItem = state.cartItems.find((i) => i.productID === removedProductId);
      if (cartItem) {
        state.numItemsInCart -= cartItem.amount;
        state.cartTotal -= Number(cartItem.price) * cartItem.amount;
        state.cartItems = state.cartItems.filter((i) => i.productID !== removedProductId);
        cartSlice.caseReducers.calculateTotals(state);
        toast({ description: 'Item removed from cart (server)' });
      }
    });
    builder.addCase(removeItemFromCartAsync.rejected, (state, action) => {
      toast({ description: 'Failed to remove item from cart' });
    });
    builder.addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      let total = 0;
      let numItems = 0;
      state.cartItems.forEach((item) => {
        total += Number(item.price) * item.amount;
        numItems += item.amount;
      });
      state.cartTotal = total;
      state.numItemsInCart = numItems;
      state.tax = 0.1 * total;
      state.orderTotal = total + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    });
    // Optionally, handle fetchCartItemsAsync.rejected as well.
  },
});

export const { addItem, clearCart, removeItem, editItem, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;