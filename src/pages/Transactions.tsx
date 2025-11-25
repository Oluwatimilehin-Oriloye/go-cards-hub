import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Card } from "@/components/ui/card";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const mockTransactions = [
  {
    id: "TXN001",
    amount: 85.35,
    type: "outflow" as "inflow" | "outflow",
    description: "Ifenna Nwafor",
    date: "13 August 2025",
    time: "18:48:45",
    status: "completed" as const,
    cardName: "Temu Card",
    cardLastFour: "6762",
    merchantName: "Ifenna Nwafor",
    merchantCategory: "Transfer",
    referenceNumber: "REF-TXN001",
    fees: 0,
  },
];

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <TopNav />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Transactions</h1>
          <Card className="p-6">
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
                {mockTransactions.map((txn) => (
                  <TableRow 
                    key={txn.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => {
                      setSelectedTransaction(txn);
                      setIsModalOpen(true);
                    }}
                  >
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={txn.type === "inflow" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
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
