/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Transaction,
  TransactionType,
  TransactionStatus,
} from "../services/transactionService";

// Format transaction for UI components
export interface UITransaction {
  id: string;
  type: "inflow" | "outflow";
  description: string;
  amount: number;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  cardName: string;
  cardLastFour: string;
  merchantName?: string;
  merchantCategory?: string;
  referenceNumber: string;
  fees?: number;
}

// Map backend transaction type to UI type (normalize everything)
export const mapTransactionType = (
  type: TransactionType | string
): "inflow" | "outflow" => {
  const inflowTypes = [
    TransactionType.DEPOSIT,
    TransactionType.INFLOW,
    "Deposit",
    "Inflow",
  ];

  // Everything else is outflow
  return inflowTypes.includes(type as any) ? "inflow" : "outflow";
};

// Map backend status to UI status
export const mapTransactionStatus = (
  status: TransactionStatus | string
): "completed" | "pending" | "failed" => {
  const statusStr = typeof status === "string" ? status : String(status);

  switch (statusStr) {
    case TransactionStatus.COMPLETED:
    case "COMPLETED":
    case "Completed":
      return "completed";
    case TransactionStatus.PENDING:
    case "PENDING":
    case "Pending":
      return "pending";
    case TransactionStatus.FAILED:
    case "FAILED":
    case "Failed":
      return "failed";
    default:
      console.warn("Unknown transaction status:", status);
      return "pending";
  }
};

// Format date from ISO string
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format time from ISO string
export const formatTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Get card name from cardId (placeholder)
export const getCardName = (cardId?: string): string => {
  if (!cardId) return "N/A";
  return "Card"; // Replace with actual lookup if available
};

// Get last 4 digits of card (placeholder)
export const getCardLastFour = (cardId?: string): string => {
  if (!cardId) return "0000";
  return cardId.slice(-4);
};

// Transform backend transaction to UI format
export const transformTransaction = (
  transaction: Transaction,
  cardName?: string,
  cardLastFour?: string
): UITransaction => {
  return {
    id: transaction.id,
    type: mapTransactionType(transaction.type),
    description: transaction.description,
    amount: transaction.amount,
    date: formatDate(transaction.createdAt),
    time: formatTime(transaction.createdAt),
    status: mapTransactionStatus(transaction.status),
    cardName: cardName || getCardName(transaction.cardId),
    cardLastFour: cardLastFour || getCardLastFour(transaction.cardId),
    merchantName: transaction.merchant,
    merchantCategory: getMerchantCategory(transaction.merchant),
    referenceNumber: transaction.reference || transaction.id,
    fees: 0,
  };
};

// Merchant category helper
const getMerchantCategory = (merchant?: string): string | undefined => {
  if (!merchant) return undefined;

  const lowerMerchant = merchant.toLowerCase();
  if (lowerMerchant.includes("netflix") || lowerMerchant.includes("spotify")) {
    return "Entertainment";
  }
  if (
    lowerMerchant.includes("amazon") ||
    lowerMerchant.includes("jumia") ||
    lowerMerchant.includes("konga")
  ) {
    return "Shopping";
  }
  if (lowerMerchant.includes("uber") || lowerMerchant.includes("bolt")) {
    return "Transportation";
  }

  return "General";
};

// Transform array of transactions
export const transformTransactions = (
  transactions: Transaction[],
  cardsMap?: Map<string, { name: string; lastFour: string }>
): UITransaction[] => {
  return transactions.map((txn) => {
    const cardInfo = cardsMap?.get(txn.cardId || "");
    return transformTransaction(txn, cardInfo?.name, cardInfo?.lastFour);
  });
};
