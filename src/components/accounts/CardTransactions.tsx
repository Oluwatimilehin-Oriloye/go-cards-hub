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
import { ChevronRight } from "lucide-react";

interface CardTransactionsProps {
  activeCard: string;
}

// Mock transaction data
const transactions = [
  {
    id: "1",
    date: "13 August 2025, 18:41:53",
    amount: "₦ 160,000.00",
    type: "Swap",
    description: "NGN-EUR",
    status: "Completed",
  },
  {
    id: "2",
    date: "13 August 2025, 18:35:14",
    amount: "₦ 160,000.00",
    type: "Deposit",
    description: "IFENNA BLOSSOM NWAFOR",
    status: "Completed",
  },
  {
    id: "3",
    date: "14 July 2025, 17:35:15",
    amount: "₦ 1,552.00",
    type: "Withdraw",
    description: "IKENGA OKWUTE",
    status: "Completed",
  },
  {
    id: "4",
    date: "03 July 2025, 01:59:59",
    amount: "₦ 8,500.00",
    type: "Swap",
    description: "NGN-USD",
    status: "Completed",
  },
  {
    id: "5",
    date: "03 July 2025, 01:59:39",
    amount: "₦ 10,000.00",
    type: "Deposit",
    description: "OKWUTE IKENGA",
    status: "Completed",
  },
];

export function CardTransactions({ activeCard }: CardTransactionsProps) {
  return (
    <Card className="p-6 border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent transactions</h2>
        <button className="text-primary font-medium hover:underline">See all</button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="text-muted-foreground">DATE</TableHead>
              <TableHead className="text-muted-foreground">AMOUNT</TableHead>
              <TableHead className="text-muted-foreground">TYPE</TableHead>
              <TableHead className="text-muted-foreground">DESCRIPTION</TableHead>
              <TableHead className="text-muted-foreground">STATUS</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow 
                key={transaction.id}
                className="hover:bg-muted/50 cursor-pointer border-border"
              >
                <TableCell className="text-foreground">{transaction.date}</TableCell>
                <TableCell className="font-medium text-foreground">{transaction.amount}</TableCell>
                <TableCell className="text-foreground">{transaction.type}</TableCell>
                <TableCell className="text-foreground">{transaction.description}</TableCell>
                <TableCell>
                  <Badge 
                    className="bg-success-bg text-success hover:bg-success-bg"
                  >
                    • {transaction.status}
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
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="font-medium text-foreground">{transaction.description}</p>
                <p className="text-sm text-muted-foreground">{transaction.date}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="font-medium text-foreground">{transaction.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-foreground">{transaction.type}</p>
                </div>
              </div>
              <Badge className="bg-success-bg text-success hover:bg-success-bg">
                • {transaction.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
