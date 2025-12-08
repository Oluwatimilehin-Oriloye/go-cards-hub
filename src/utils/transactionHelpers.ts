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

// Map backend transaction type to UI type
export const mapTransactionType = (
  type: TransactionType | string
): "inflow" | "outflow" => {
  const inflowTypes = [
    TransactionType.DEPOSIT,
    TransactionType.INFLOW,
    "Deposit",
    "Inflow",
  ];
  return inflowTypes.includes(type as any) ? "inflow" : "outflow";
};

// Map backend status to UI status
export const mapTransactionStatus = (
  status: TransactionStatus | string
): "completed" | "pending" | "failed" => {
  // Handle both enum and string values - match your backend capitalized format
  const statusStr = typeof status === "string" ? status : status.toString();

  switch (statusStr) {
    case TransactionStatus.COMPLETED:
    case "Completed":
      return "completed";
    case TransactionStatus.PENDING:
    case "Pending":
      return "pending";
    case TransactionStatus.FAILED:
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

// Get card name from cardId (you might need to fetch this from cards service)
export const getCardName = (cardId?: string): string => {
  if (!cardId) return "N/A";
  // This is a placeholder - you should fetch actual card name from your cards service
  // For now, returning a generic name
  return "Card";
};

// Get last 4 digits of card (you might need to fetch this from cards service)
export const getCardLastFour = (cardId?: string): string => {
  if (!cardId) return "0000";
  // This is a placeholder - you should fetch actual last 4 from your cards service
  // For now, returning last 4 characters of cardId
  return cardId.slice(-4);
};

// Transform backend transaction to UI format
export const transformTransaction = (
  transaction: Transaction,
  cardName?: string,
  cardLastFour?: string
): UITransaction => {
  // Debug: Log the actual status value from backend
  console.log(
    "Transaction status from backend:",
    transaction.status,
    "Type:",
    typeof transaction.status
  );

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
    fees: 0, // Add if you have fees in your backend
  };
};

// Get merchant category (placeholder - you might want to add this to backend)
const getMerchantCategory = (merchant?: string): string | undefined => {
  if (!merchant) return undefined;

  // Simple categorization based on merchant name
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
