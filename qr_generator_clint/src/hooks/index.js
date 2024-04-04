import { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { AuthContext } from "../providers/AuthProvider";
import { fetchUser, login as userLogin } from "../api";
import {
  LOCAL_STORAGE_KEY,
  setItemInLocalStorage,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils";
import { useToasts } from "react-toast-notifications";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const { addToast } = useToasts();
  //   const auth = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getUserId = async () => {
      const userToken = getItemFromLocalStorage(LOCAL_STORAGE_KEY);
      if (userToken) {
        const userId = jwtDecode(userToken);
        // console.log("userId from useProvider auth:: ", userId);
         try {
            const userData = await fetchUser(userId.data);
            if (userData.data) {
                setUser(userData.data.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        // console.log("auth User :: ", user);
      }
    };
    getUserId();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await userLogin(email, password);
    // console.log("auth login response:: ", response);
    if (response.data.status) {
      // console.log("response.data.data:: ", response.data.data);
      const userData = response.data.data;
      // console.log("userData ", response.data.data);

      //   auth.user = response.data.data;
      setUser(response.data.data);
      // console.log("auth user login :: ", user);
      setItemInLocalStorage(
        LOCAL_STORAGE_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        message: response.data.message,
      };
    }
    } catch (error) {
      return {
        status: false,
        message: "Error in connecting Server",
      };
    }
    
  };
  const logout = () => {
    
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_KEY);
    addToast("Logout successfully", {
      appearance: 'success',
    });
  };
  return {
    user,
    login,
    logout,
  };
};
