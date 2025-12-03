// import { useState } from "react";
// import { Sidebar } from "@/components/dashboard/Sidebar";
// import { TopNav } from "@/components/dashboard/TopNav";
// import { Card } from "@/components/ui/card";
// import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { ChevronRight } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const mockTransactions = [
//   {
//     id: "TXN001",
//     amount: 85.35,
//     type: "outflow" as "inflow" | "outflow",
//     description: "Ifenna Nwafor",
//     date: "13 August 2025",
//     time: "18:48:45",
//     status: "completed" as const,
//     cardName: "Temu Card",
//     cardLastFour: "6762",
//     merchantName: "Ifenna Nwafor",
//     merchantCategory: "Transfer",
//     referenceNumber: "REF-TXN001",
//     fees: 0,
//   },
// ];

// export default function Transactions() {
//   const [selectedTransaction, setSelectedTransaction] = useState<typeof mockTransactions[0] | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [typeFilter, setTypeFilter] = useState<string>("all");
//   const [cardFilter, setCardFilter] = useState<string>("all");

//   const filteredTransactions = mockTransactions.filter((txn) => {
//     const matchesType = typeFilter === "all" || txn.type === typeFilter;
//     const matchesCard = cardFilter === "all" || txn.cardName === cardFilter;
//     return matchesType && matchesCard;
//   });

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Sidebar />
//       <div className="flex-1 ml-64">
//         <TopNav />
//         <main className="p-6">
//           <h1 className="text-2xl font-bold mb-6">Transactions</h1>

//           {/* Filters */}
//           <div className="flex gap-4 mb-6">
//             <Select value={typeFilter} onValueChange={setTypeFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="All Transactions" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Transactions</SelectItem>
//                 <SelectItem value="inflow">Inflow</SelectItem>
//                 <SelectItem value="outflow">Outflow</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={cardFilter} onValueChange={setCardFilter}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="All Cards" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Cards</SelectItem>
//                 <SelectItem value="Temu Card">Temu Card</SelectItem>
//                 <SelectItem value="Jumia Card">Jumia Card</SelectItem>
//                 <SelectItem value="Konga Card">Konga Card</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Card className="p-6">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredTransactions.map((txn) => (
//                   <TableRow
//                     key={txn.id}
//                     className="cursor-pointer hover:bg-muted/50"
//                     onClick={() => {
//                       setSelectedTransaction(txn);
//                       setIsModalOpen(true);
//                     }}
//                   >
//                     <TableCell>{txn.date}</TableCell>
//                     <TableCell>{txn.description}</TableCell>
//                     <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
//                     <TableCell>
//                       <Badge className={txn.type === "inflow" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}>
//                         {txn.type}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <ChevronRight className="h-4 w-4" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Card>
//         </main>
//       </div>

//       {selectedTransaction && (
//         <TransactionDetailsModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           transaction={selectedTransaction}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
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
import {
  transactionService,
  TransactionType,
} from "@/services/transactionService";
import {
  transformTransactions,
  UITransaction,
} from "@/utils/transactionHelpers";
import { Button } from "@/components/ui/button";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<UITransaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [cardFilter, setCardFilter] = useState<string>("all");

  useEffect(() => {
    fetchTransactions();
  }, [typeFilter, cardFilter]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build filters
      const filters: any = {};

      if (typeFilter !== "all") {
        // Map UI filter to backend enum
        if (typeFilter === "inflow") {
          filters.type = TransactionType.INFLOW;
        } else if (typeFilter === "outflow") {
          filters.type = TransactionType.OUTFLOW;
        }
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
                {/* TODO: Dynamically populate with user's cards */}
                <SelectItem value="temu-card">Temu Card</SelectItem>
                <SelectItem value="jumia-card">Jumia Card</SelectItem>
                <SelectItem value="konga-card">Konga Card</SelectItem>
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
