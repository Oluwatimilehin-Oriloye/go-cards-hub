// src/services/authService.ts
import axios from "axios";

// Define the expected structure of the successful token response
interface AuthResponse {
  access_token: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  accountNumber: string;
}

// 🚨 CRITICAL: Ensure this matches your NestJS base URL and global prefix
const API_BASE_URL = "http://localhost:3000/auth";

/**
 * Step 1: Sends the account number to the backend to request an OTP via email.
 */
export const requestOtp = async (accountNumber: string): Promise<void> => {
  try {
    // Calls POST /api/auth/send-otp
    await axios.post(`${API_BASE_URL}/send-otp`, { accountNumber });
  } catch (error) {
    // Check for a 404 (Account not found) or general error
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(
        "Account number not registered. Please check the number."
      );
    }
    throw new Error(
      "Could not send OTP. Please check server status or contact support."
    );
  }
};

/**
 * Step 2: Sends the OTP to verify and obtain the JWT.
 * Stores the token in localStorage and returns it.
 */
export const verifyOtp = async (otp: string): Promise<string> => {
  try {
    // Calls POST /api/auth/verify-otp
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/verify-otp`,
      {
        otp,
      }
    );

    const token = response.data.access_token;

    // **CRITICAL:** Store the token for subsequent protected API calls
    localStorage.setItem("authToken", token);

    return token;
  } catch (error) {
    // Check for a 401 (Invalid/Expired OTP)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Invalid or expired OTP. Please try again.");
    }
    throw new Error("OTP verification failed due to a server error.");
  }
};

export const getProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required: Missing JWT token.");
  }

  // Calls GET /auth/profile
  const response = await axios.get<UserProfile>(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/**
 * Helper function to clear the token (Logout)
 */
export const logout = (): void => {
  localStorage.removeItem("authToken");
};
