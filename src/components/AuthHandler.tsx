import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { loginUser } from "../features/user/userSlice";

const AuthHandler: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encodedUserData = params.get("user_data");
    const id_token = params.get("id_token"); // извлекаем токен
    let userData = null;
    
    if (encodedUserData) {
      try {
        userData = JSON.parse(atob(encodedUserData));
        localStorage.setItem("user_data", JSON.stringify(userData));
      } catch (error) {
        console.error("Error decoding user_data:", error);
      }
      if (id_token) {
        localStorage.setItem("authToken", id_token);
        console.log("ID token saved to Local Storage.");
      }
      navigate(location.pathname, { replace: true });
    } else if (!user) {
      const stored = localStorage.getItem("user_data");
      if (stored) {
        try {
          userData = JSON.parse(stored);
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
    }
    if (userData && !user) {
      dispatch(loginUser(userData));
    }
  }, [location, navigate, dispatch, user]);

  return null;
};

export default AuthHandler;