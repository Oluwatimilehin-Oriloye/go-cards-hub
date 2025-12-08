import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Loader2 } from "lucide-react";
import { transactionService } from "@/services/transactionService";
import {
  transformTransactions,
  UITransaction,
} from "@/utils/transactionHelpers";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
import { Button } from "@/components/ui/button";

interface CardTransactionsProps {
  activeCard: string;
}

export function CardTransactions({ activeCard }: CardTransactionsProps) {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<UITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [activeCard]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      let data;

      // If active card is "account-balance", fetch all user transactions
      // Otherwise fetch transactions for specific card
      if (activeCard === "account-balance") {
        data = await transactionService.getRecentTransactions(5);
      } else {
        data = await transactionService.getCardTransactions(activeCard);
      }

      const transformedData = transformTransactions(data);
      // Limit to 5 most recent for display
      setTransactions(transformedData.slice(0, 5));
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

  const handleSeeAll = () => {
    // Navigate to transactions page
    // If viewing a specific card, pass the card filter
    if (activeCard !== "account-balance") {
      navigate(`/transactions?card=${activeCard}`);
    } else {
      navigate("/transactions");
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success-bg text-success hover:bg-success-bg";
      case "pending":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/10";
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/10";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDateTime = (date: string, time: string) => {
    return `${date}, ${time}`;
  };

  return (
    <>
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />

      <Card className="p-6 border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Recent transactions
          </h2>
          <button
            onClick={handleSeeAll}
            className="text-primary font-medium hover:underline"
          >
            See all
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <span className="text-muted-foreground">
              Loading transactions...
            </span>
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
            <p className="text-muted-foreground">No transactions yet</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-muted-foreground">
                      DATE
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      AMOUNT
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      TYPE
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      DESCRIPTION
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      STATUS
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-muted/50 cursor-pointer border-border"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <TableCell className="text-foreground">
                        {formatDateTime(transaction.date, transaction.time)}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        ₦ {transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-foreground capitalize">
                        {transaction.type}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {transaction.description}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeClass(transaction.status)}
                        >
                          •{" "}
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {transactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(transaction.date, transaction.time)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">
                          ₦ {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Type</p>
                        <p className="text-foreground capitalize">
                          {transaction.type}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusBadgeClass(transaction.status)}>
                      •{" "}
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
