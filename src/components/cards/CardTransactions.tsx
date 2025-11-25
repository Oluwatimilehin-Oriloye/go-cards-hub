import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface CardTransactionsProps {
  selectedCardId: string;
}

// Mock transaction data per card
const transactionsByCard: Record<string, Array<{
  date: string;
  merchant: string;
  amount: string;
  status: "Completed" | "Pending";
}>> = {
  "temu-card": [
    { date: "Nov 15, 2025", merchant: "Temu Online Store", amount: "₦12,450.00", status: "Completed" },
    { date: "Nov 14, 2025", merchant: "Temu Marketplace", amount: "₦8,200.50", status: "Completed" },
    { date: "Nov 12, 2025", merchant: "Temu Shop", amount: "₦5,890.00", status: "Pending" },
  ],
  "jumia-card": [
    { date: "Nov 15, 2025", merchant: "Jumia Electronics", amount: "₦45,000.00", status: "Completed" },
    { date: "Nov 13, 2025", merchant: "Jumia Fashion", amount: "₦12,500.00", status: "Completed" },
  ],
  "konga-card": [
    { date: "Nov 14, 2025", merchant: "Konga Supermarket", amount: "₦18,750.00", status: "Completed" },
    { date: "Nov 11, 2025", merchant: "Konga Mall", amount: "₦9,250.00", status: "Pending" },
  ],
};

export function CardTransactions({ selectedCardId }: CardTransactionsProps) {
  const transactions = transactionsByCard[selectedCardId] || [];

  return (
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
                {transactions.map((transaction, index) => (
                  <TableRow key={index} className="hover:bg-muted/50 cursor-pointer">
                    <TableCell className="text-foreground">{transaction.date}</TableCell>
                    <TableCell className="text-foreground">{transaction.merchant}</TableCell>
                    <TableCell className="text-foreground font-medium">{transaction.amount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          transaction.status === "Completed"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {transactions.map((transaction, index) => (
              <Card key={index} className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-foreground">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      transaction.status === "Completed"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-foreground">{transaction.amount}</p>
              </Card>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
