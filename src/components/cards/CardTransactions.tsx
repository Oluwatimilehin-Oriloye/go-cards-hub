import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";

interface CardTransactionsProps {
  selectedCardId: string;
}

// Mock transaction data per card
const transactionsByCard: Record<string, Array<{
  id: string;
  date: string;
  time: string;
  merchantName: string;
  amount: number;
  type: "inflow" | "outflow";
  status: "completed" | "pending" | "failed";
  cardName: string;
  cardLastFour: string;
  referenceNumber: string;
  description: string;
}>> = {
  "temu-card": [
    { id: "TXN123456789", date: "Nov 15, 2025", time: "10:23 AM", merchantName: "Temu Online Store", amount: 12450, type: "outflow", status: "completed", cardName: "Temu Card", cardLastFour: "6762", referenceNumber: "TXN123456789", description: "Purchase from Temu Online Store" },
    { id: "TXN123456790", date: "Nov 14, 2025", time: "02:15 PM", merchantName: "Temu Marketplace", amount: 8200.50, type: "outflow", status: "completed", cardName: "Temu Card", cardLastFour: "6762", referenceNumber: "TXN123456790", description: "Purchase from Temu Marketplace" },
    { id: "TXN123456791", date: "Nov 12, 2025", time: "09:45 AM", merchantName: "Temu Shop", amount: 5890, type: "outflow", status: "pending", cardName: "Temu Card", cardLastFour: "6762", referenceNumber: "TXN123456791", description: "Purchase from Temu Shop" },
  ],
  "jumia-card": [
    { id: "TXN123456792", date: "Nov 15, 2025", time: "11:30 AM", merchantName: "Jumia Electronics", amount: 45000, type: "outflow", status: "completed", cardName: "Jumia Card", cardLastFour: "8923", referenceNumber: "TXN123456792", description: "Purchase from Jumia Electronics" },
    { id: "TXN123456793", date: "Nov 13, 2025", time: "03:20 PM", merchantName: "Jumia Fashion", amount: 12500, type: "outflow", status: "completed", cardName: "Jumia Card", cardLastFour: "8923", referenceNumber: "TXN123456793", description: "Purchase from Jumia Fashion" },
  ],
  "konga-card": [
    { id: "TXN123456794", date: "Nov 14, 2025", time: "01:10 PM", merchantName: "Konga Supermarket", amount: 18750, type: "outflow", status: "completed", cardName: "Konga Card", cardLastFour: "3456", referenceNumber: "TXN123456794", description: "Purchase from Konga Supermarket" },
    { id: "TXN123456795", date: "Nov 11, 2025", time: "04:55 PM", merchantName: "Konga Mall", amount: 9250, type: "outflow", status: "pending", cardName: "Konga Card", cardLastFour: "3456", referenceNumber: "TXN123456795", description: "Purchase from Konga Mall" },
  ],
};

export function CardTransactions({ selectedCardId }: CardTransactionsProps) {
  const transactions = transactionsByCard[selectedCardId] || [];
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTransactionClick = (transaction: typeof transactions[0]) => {
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
        <h2 className="text-xl font-bold text-foreground">Recent transactions</h2>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          See all
        </button>
      </div>

      {transactions.length === 0 ? (
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
                  <TableHead className="text-muted-foreground uppercase text-xs">Date</TableHead>
                  <TableHead className="text-muted-foreground uppercase text-xs">Merchant</TableHead>
                  <TableHead className="text-muted-foreground uppercase text-xs">Amount</TableHead>
                  <TableHead className="text-muted-foreground uppercase text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id} 
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <TableCell className="text-foreground">{transaction.date}</TableCell>
                    <TableCell className="text-foreground">{transaction.merchantName}</TableCell>
                    <TableCell className="text-foreground font-medium">₦{transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          transaction.status === "completed"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        }
                      >
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
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
                    <p className="font-medium text-foreground">{transaction.merchantName}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      transaction.status === "completed"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    }
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-foreground">₦{transaction.amount.toLocaleString()}</p>
              </Card>
            ))}
          </div>
        </>
      )}
    </Card>
    </>
  );
}
