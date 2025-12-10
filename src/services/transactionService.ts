import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

// Keep enums aligned with backend entity values
export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  SWAP = "SWAP",
  CARD_FUNDING = "CARD_FUNDING",
  CARD_SPENDING = "CARD_SPENDING",
  INFLOW = "INFLOW",
  OUTFLOW = "OUTFLOW",
  TRANSFER = "TRANSFER",
  SEND_MONEY = "SEND_MONEY",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
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
  type?: string; // "inflow" | "outflow" (case-insensitive; backend will group)
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
    const token =
      localStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      localStorage.getItem("token") ||
      sessionStorage.getItem("authToken") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }
    return token;
  }

  private getHeaders() {
    const token = this.getAuthToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async getUserTransactions(
    filters?: FilterTransactionsDto
  ): Promise<Transaction[]> {
    const params = new URLSearchParams();

    if (filters?.type) params.append("type", filters.type); // "inflow" or "outflow"
    if (filters?.status) params.append("status", filters.status);
    if (filters?.cardId) params.append("cardId", filters.cardId);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);

    const response = await axios.get(
      `${API_BASE_URL}/transactions?${params.toString()}`,
      { headers: this.getHeaders() }
    );

    return response.data;
  }

  async getRecentTransactions(limit: number = 10): Promise<Transaction[]> {
    const response = await axios.get(
      `${API_BASE_URL}/transactions/recent?limit=${limit}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }

  async getTransactionStats(): Promise<TransactionStats> {
    const response = await axios.get(`${API_BASE_URL}/transactions/stats`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const response = await axios.get(`${API_BASE_URL}/transactions/${id}`, {
      headers: this.getHeaders(),
    });
    return response.data;
  }

  async getCardTransactions(cardId: string): Promise<Transaction[]> {
    const response = await axios.get(
      `${API_BASE_URL}/transactions/card/${cardId}`,
      { headers: this.getHeaders() }
    );
    return response.data;
  }
}

export const transactionService = new TransactionService();
