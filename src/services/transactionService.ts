// import axios from "axios";

// // Match your backend structure (no /auth prefix for transactions)
// const API_BASE_URL = "http://localhost:3000";

// // Types matching your backend
// export enum TransactionType {
//   DEPOSIT = "DEPOSIT",
//   WITHDRAW = "WITHDRAW",
//   CARD_FUNDING = "CARD_FUNDING",
//   CARD_SPENDING = "CARD_SPENDING",
//   INFLOW = "INFLOW",
//   OUTFLOW = "OUTFLOW",
// }

// export enum TransactionStatus {
//   PENDING = "PENDING",
//   COMPLETED = "COMPLETED",
//   FAILED = "FAILED",
// }

// export interface Transaction {
//   id: string;
//   userId: string;
//   amount: number;
//   type: TransactionType;
//   description: string;
//   merchant?: string;
//   cardId?: string;
//   reference?: string;
//   balanceBefore: number;
//   balanceAfter: number;
//   status: TransactionStatus;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface FilterTransactionsDto {
//   type?: TransactionType;
//   status?: TransactionStatus;
//   cardId?: string;
//   startDate?: string;
//   endDate?: string;
// }

// export interface TransactionStats {
//   totalTransactions: number;
//   totalInflow: number;
//   totalOutflow: number;
//   totalCardSpending: number;
//   netFlow: number;
//   transactionsByType: Record<string, { count: number; total: number }>;
//   transactionsByStatus: Record<string, number>;
// }

// class TransactionService {
//   private getAuthToken(): string {
//     // Primary: Check for 'authToken' (matches your authService.ts)
//     const token =
//       localStorage.getItem("authToken") ||
//       localStorage.getItem("access_token") ||
//       localStorage.getItem("token") ||
//       sessionStorage.getItem("authToken") ||
//       sessionStorage.getItem("access_token");

//     if (!token) {
//       console.error(
//         "No authentication token found in localStorage or sessionStorage"
//       );
//       console.log("Available localStorage keys:", Object.keys(localStorage));
//       throw new Error("No authentication token found. Please log in again.");
//     }
//     return token;
//   }

//   private getHeaders() {
//     try {
//       const token = this.getAuthToken();
//       return {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
//     } catch (error) {
//       console.error("Error getting auth headers:", error);
//       throw error;
//     }
//   }

//   // Get all user transactions with optional filters
//   async getUserTransactions(
//     filters?: FilterTransactionsDto
//   ): Promise<Transaction[]> {
//     try {
//       const params = new URLSearchParams();

//       if (filters?.type) params.append("type", filters.type);
//       if (filters?.status) params.append("status", filters.status);
//       if (filters?.cardId) params.append("cardId", filters.cardId);
//       if (filters?.startDate) params.append("startDate", filters.startDate);
//       if (filters?.endDate) params.append("endDate", filters.endDate);

//       const response = await axios.get(
//         `${API_BASE_URL}/transactions?${params.toString()}`,
//         { headers: this.getHeaders() }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       throw error;
//     }
//   }

//   // Get recent transactions
//   async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/transactions/recent?limit=${limit}`,
//         { headers: this.getHeaders() }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching recent transactions:", error);
//       throw error;
//     }
//   }

//   // Get transaction statistics
//   async getTransactionStats(): Promise<TransactionStats> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/transactions/stats`, {
//         headers: this.getHeaders(),
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching transaction stats:", error);
//       throw error;
//     }
//   }

//   // Get single transaction by ID
//   async getTransactionById(id: string): Promise<Transaction> {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/transactions/${id}`, {
//         headers: this.getHeaders(),
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching transaction:", error);
//       throw error;
//     }
//   }

//   // Get transactions for a specific card
//   async getCardTransactions(cardId: string): Promise<Transaction[]> {
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/transactions/card/${cardId}`,
//         { headers: this.getHeaders() }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Error fetching card transactions:", error);
//       throw error;
//     }
//   }
// }

// export const transactionService = new TransactionService();

import axios from "axios";

// Match your backend structure (no /auth prefix for transactions)
const API_BASE_URL = "http://localhost:3000";

// Types matching your backend
export enum TransactionType {
  DEPOSIT = "Deposit",
  WITHDRAW = "Withdraw",
  SWAP = "Swap",
  CARD_FUNDING = "Card Funding",
  CARD_SPENDING = "Card Spending",
  INFLOW = "Inflow",
  OUTFLOW = "Outflow",
  TRANSFER = "Transfer",
}

export enum TransactionStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  FAILED = "Failed",
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  merchant?: string;
  cardId?: string;
  reference?: string;
  balanceBefore: number;
  balanceAfter: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface FilterTransactionsDto {
  type?: TransactionType;
  status?: TransactionStatus;
  cardId?: string;
  startDate?: string;
  endDate?: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalInflow: number;
  totalOutflow: number;
  totalCardSpending: number;
  netFlow: number;
  transactionsByType: Record<string, { count: number; total: number }>;
  transactionsByStatus: Record<string, number>;
}

class TransactionService {
  private getAuthToken(): string {
    // Primary: Check for 'authToken' (matches your authService.ts)
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      console.error(
        "No authentication token found in localStorage or sessionStorage"
      );
      console.log("Available localStorage keys:", Object.keys(localStorage));
      throw new Error("No authentication token found. Please log in again.");
    }
    return token;
  }

  private getHeaders() {
    try {
      const token = this.getAuthToken();
      return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    } catch (error) {
      console.error("Error getting auth headers:", error);
      throw error;
    }
  }

  // Get all user transactions with optional filters
  async getUserTransactions(
    filters?: FilterTransactionsDto
  ): Promise<Transaction[]> {
    try {
      const params = new URLSearchParams();

      if (filters?.type) params.append("type", filters.type);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.cardId) params.append("cardId", filters.cardId);
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);

      const response = await axios.get(
        `${API_BASE_URL}/transactions?${params.toString()}`,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  // Get recent transactions
  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/recent?limit=${limit}`,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      throw error;
    }
  }

  // Get transaction statistics
  async getTransactionStats(): Promise<TransactionStats> {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/stats`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching transaction stats:", error);
      throw error;
    }
  }

  // Get single transaction by ID
  async getTransactionById(id: string): Promise<Transaction> {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/${id}`, {
        headers: this.getHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching transaction:", error);
      throw error;
    }
  }

  // Get transactions for a specific card
  async getCardTransactions(cardId: string): Promise<Transaction[]> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/transactions/card/${cardId}`,
        { headers: this.getHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching card transactions:", error);
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
