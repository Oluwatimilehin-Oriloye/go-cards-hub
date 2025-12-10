/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Card } from "@/components/ui/card";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { transactionService } from "@/services/transactionService";
import {
  transformTransactions,
  UITransaction,
} from "@/utils/transactionHelpers";
import { Button } from "@/components/ui/button";
import {
  getAccountSummary,
  AccountSummaryData,
} from "@/services/accountService";

export default function Transactions() {
  const [searchParams] = useSearchParams();
  const [selectedTransaction, setSelectedTransaction] =
    useState<UITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCards, setUserCards] = useState<
    AccountSummaryData["cardBalances"]
  >([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [cardFilter, setCardFilter] = useState<string>(
    searchParams.get("card") || "all"
  );

  useEffect(() => {
    fetchUserCards();
  }, []);

  useEffect(() => {
    const cardParam = searchParams.get("card");
    if (cardParam) {
      setCardFilter(cardParam);
    }
  }, [searchParams]);

  const fetchUserCards = async () => {
    try {
      setCardsLoading(true);
      const data = await getAccountSummary();
      setUserCards(data.cardBalances);
    } catch (err) {
      console.error("Error fetching user cards:", err);
    } finally {
      setCardsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [typeFilter, cardFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters: any = {};

      // Send simple "inflow" / "outflow" string to backend
      if (typeFilter !== "all") {
        filters.type = typeFilter; // backend groups types by this
      }

      if (cardFilter !== "all") {
        filters.cardId = cardFilter;
      }

      const data = await transactionService.getUserTransactions(filters);
      const transformedData = transformTransactions(data);
      setTransactions(transformedData);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleTransactionClick = (transaction: UITransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopNav />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Transactions</h1>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Transactions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="inflow">Inflow</SelectItem>
                <SelectItem value="outflow">Outflow</SelectItem>
              </SelectContent>
            </Select>

            <Select value={cardFilter} onValueChange={setCardFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Cards" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cards</SelectItem>
                {cardsLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading cards...
                  </SelectItem>
                ) : userCards.length === 0 ? (
                  <SelectItem value="no-cards" disabled>
                    No cards available
                  </SelectItem>
                ) : (
                  userCards.map((card) => (
                    <SelectItem key={card.cardId} value={card.cardId}>
                      {card.cardName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <Card className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Loading transactions...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 gap-2">
                <p className="text-destructive">{error}</p>
                <Button onClick={fetchTransactions} variant="outline" size="sm">
                  Retry
                </Button>
              </div>
            ) : transactions.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow
                      key={txn.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleTransactionClick(txn)}
                    >
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            txn.type === "inflow"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-red-500/10 text-red-600"
                          }
                        >
                          {txn.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </main>
      </div>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
