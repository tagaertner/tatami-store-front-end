import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "../../components/ui/use-toast";
import { User, UserState } from "../../utils/types";

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user_data");
  return user ? JSON.parse(user) : null;
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user_data", JSON.stringify(user));
      toast({ description: "Login successful" });
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("user_data");
      toast({ description: "Logout successful" });
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;