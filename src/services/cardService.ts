import axios from "axios";

const API_BASE_URL = "http://localhost:3000/cards";

export interface Card {
  id: string;
  cardName: string;
  cardNumber: string; // masked
  cvv: string; // masked
  expiryDate: string;
  type: string;
  status: string; // 'active', 'frozen', 'blocked', 'deleted'
  currency: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardDetails {
  id: string;
  cardName: string;
  cardNumber: string; // full number
  cvv: string; // full CVV
  expiryDate: string;
  type: string;
  status: string;
  currency: string;
  balance: number;
  createdAt: string;
}

// Fetch all cards for the logged-in user
export const getMyCards = async (): Promise<Card[]> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get card full details
export const getCardDetails = async (id: string): Promise<CardDetails> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.get(`${API_BASE_URL}/${id}/details`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Create virtual card
export const createVirtualCard = async (data: {
  cardName?: string;
  currency?: string;
}) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.post(`${API_BASE_URL}/create-virtual`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Freeze card
export const freezeCard = async (cardId: string): Promise<Card> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.patch(
    `${API_BASE_URL}/${cardId}/freeze`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Unfreeze card
export const unfreezeCard = async (cardId: string): Promise<Card> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.patch(
    `${API_BASE_URL}/${cardId}/unfreeze`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Delete card
export const deleteCard = async (
  cardId: string
): Promise<{ message: string; cardId: string }> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.delete(`${API_BASE_URL}/${cardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fund card
export const fundCard = async (
  cardId: string,
  data: { amount: number; pin: string }
): Promise<Card> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Missing authentication token");

  const response = await axios.post(`${API_BASE_URL}/${cardId}/fund`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
