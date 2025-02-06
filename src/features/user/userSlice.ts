import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "../../components/ui/use-toast";
import { User, UserState } from "../../utils/types";

// Функция для получения данных пользователя из localStorage
const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user_data");
  return user ? JSON.parse(user) : null;
};

// Инициализация состояния пользователя, используя данные из localStorage
const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Функция для логина пользователя
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user_data", JSON.stringify(user));
      toast({ description: "Login successful" });
    },

    // Функция для логаута пользователя
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user_data");
      toast({ description: "Logout successful" });
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;