import { useState, useEffect } from "react";
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
import { TrendingUp } from "lucide-react";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
import { transactionService } from "@/services/transactionService";
import {
  transformTransactions,
  UITransaction,
} from "@/utils/transactionHelpers";
import { Button } from "@/components/ui/button";

interface CardTransactionsProps {
  selectedCardId: string;
}

export function CardTransactions({ selectedCardId }: CardTransactionsProps) {
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<UITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCardId) {
      fetchCardTransactions();
    }
  }, [selectedCardId]);

  const fetchCardTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getCardTransactions(selectedCardId);
      const transformedData = transformTransactions(data);
      setTransactions(transformedData);
    } catch (err) {
      console.error("Error fetching card transactions:", err);
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
    <>
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Recent transactions
          </h2>
          <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            See all
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchCardTransactions} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No transaction to show</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground uppercase text-xs">
                      Date
                    </TableHead>
                    <TableHead className="text-muted-foreground uppercase text-xs">
                      Merchant
                    </TableHead>
                    <TableHead className="text-muted-foreground uppercase text-xs">
                      Amount
                    </TableHead>
                    <TableHead className="text-muted-foreground uppercase text-xs">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <TableCell className="text-foreground">
                        {transaction.date}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {transaction.merchantName || transaction.description}
                      </TableCell>
                      <TableCell className="text-foreground font-medium">
                        ₦{transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.status === "completed"
                              ? "bg-success/10 text-success border-success/20"
                              : transaction.status === "pending"
                              ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                          }
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {transactions.map((transaction) => (
                <Card
                  key={transaction.id}
                  className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.merchantName || transaction.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        transaction.status === "completed"
                          ? "bg-success/10 text-success border-success/20"
                          : transaction.status === "pending"
                          ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                          : "bg-red-500/10 text-red-500 border-red-500/20"
                      }
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    ₦{transaction.amount.toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </>
  );
}
