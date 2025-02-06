import { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { loginUser } from "../features/user/userSlice";

// AuthInitializer loads user data from localStorage and updates Redux state.
const AuthInitializer: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Try to load user data from localStorage
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        // Dispatch the loginUser action to update Redux state
        dispatch(loginUser(userData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, [dispatch]);

  return null; // This component does not render anything
};

export default AuthInitializer;