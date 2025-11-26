import axios from "axios";

const API_BASE_URL = "http://localhost:3000/cards";

export interface Card {
  id: string;
  cardName: string;
  cardNumber: string; // masked
  cvv: string;        // masked
  expiryDate: string;
  type: string;
  status: string;
  currency: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

// Fetch all cards for the logged-in user
export const getMyCards = async (): Promise<Card[]> => {
  const token = localStorage.getItem("authToken");

  if (!token) throw new Error("Missing authentication token");

  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};

// Get card full details
export const getCardDetails = async (id: string) => {
  const token = localStorage.getItem("authToken");

  if (!token) throw new Error("Missing authentication token");

  const response = await axios.get(`${API_BASE_URL}/${id}/details`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response.data;
};

// Create virtual card
export const createVirtualCard = async (data: { cardName: string }) => {
  const token = localStorage.getItem("authToken");

  if (!token) throw new Error("Missing authentication token");

  const response = await axios.post(
    `${API_BASE_URL}/create-virtual`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};
