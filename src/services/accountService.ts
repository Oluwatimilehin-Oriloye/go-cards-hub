// src/services/accountService.ts (New or Updated File)
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// 🚨 NEW INTERFACES to match the updated NestJS response
export interface CardBalance {
  cardId: string;
  cardName: string;
  balance: number;
}

export interface AccountSummaryData {
  accountNumber: string;
  accountName: string;
  accountBalance: number; // Main account balance
  availableBalance: number;
  currency: string;
  email: string;
  accountType: string;
  status: string;
  cardBalances: CardBalance[]; // Array of virtual card balances
}

/**
 * Fetches the user's main account summary and all virtual card balances.
 */
export const getAccountSummary = async (): Promise<AccountSummaryData> => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // In a real app, this should trigger a redirect to login
    throw new Error("Authentication required: Missing JWT token.");
  }

  // Calls GET /api/accounts/summary (your existing endpoint)
  const response = await axios.get<AccountSummaryData>(
    `${API_BASE_URL}/accounts/summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
