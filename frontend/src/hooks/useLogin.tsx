
interface UserData {
  username: string;
  password: string;
  email: string;
  campusID: string;
  hostel: string;
  phone: string;
  money: number;
}

import axios from "axios";
import Cookies from 'js-cookie'; // Add this import

/**
 * The useLogin hook.
 */
const useLogin = () => {

  /**
   * Handles user registration.
   */
  const register = async (userData: UserData) => {
    try {
      const response = await axios.post("/api/register", userData);

      if (response.data.success) {
        alert("Registration successful!");
        window.location.href = "/login"; // Redirect to login page after successful registration
      } else {
        alert("Registration failed: " + response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during registration.");
    }
  };

  /**
   * Handles the login process.
   */

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      email: email,
      password: password,
    });

    console.log(response.data);
    
    if (response.data) {
      // Set a cookie
      Cookies.set('userId', response.data.userId, { expires: 7 }); // Set the cookie to expire in 7 days
      window.location.href = "/products";
    } else {
      window.location.href = "/login";
      alert("Login Failed");
    }
  } catch (error) {
    console.log(error);
  }
};

  /**
   * Checks if the user is logged in.
   */
  const checkLogin = () => {
    const userId = Cookies.get('userId');
  
    if (userId) {
      // Cookie exists, user is considered logged in
      return true;
    } else {
      // No cookie, user is not logged in
      window.location.href = "/login";
      return false;
    }
  };
const checkLogin2 = async () => {
  const userId = Cookies.get('userId');

  if (userId) {
    try {
      const response = await axios.post("/api/checkLogin", {
        userId: userId,
      });

      if (response.data.login) {
        return true;
      } else {
        window.location.href = "/login";
        return false;
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/login";
      return false;
    }
  } else {
    window.location.href = "/login";
    return false;
  }
};


  /**
   * Checks if the user is logged in without redirecting.
   */
  const checkLoginWithoutRedirect = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        // POST request to the Spring Boot backend to validate session
        const response = await axios.post("/api/checkLogin", {
          userId: user,
        });

        if (response.data.login) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  return { register, handleLogin, checkLogin, checkLoginWithoutRedirect };
};

export default useLogin;
