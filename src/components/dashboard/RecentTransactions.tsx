// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
// import { useNavigate } from "react-router-dom";

// const transactions = [
//   {
//     id: "TXN001234567",
//     type: "outflow" as const,
//     description: "Netflix Subscription",
//     amount: 5000,
//     date: "Nov 25, 2025",
//     time: "2:30 PM",
//     status: "completed" as const,
//     cardName: "Jumia Card",
//     cardLastFour: "1234",
//     merchantName: "Netflix Inc.",
//     merchantCategory: "Entertainment",
//     referenceNumber: "REF-NET-001234567",
//     fees: 0,
//   },
//   {
//     id: "TXN001234568",
//     type: "inflow" as const,
//     description: "Card Funding",
//     amount: 50000,
//     date: "Nov 24, 2025",
//     time: "9:15 AM",
//     status: "completed" as const,
//     cardName: "Temu Card",
//     cardLastFour: "5678",
//     referenceNumber: "REF-FUND-001234568",
//     fees: 50,
//   },
//   {
//     id: "TXN001234569",
//     type: "outflow" as const,
//     description: "Amazon Purchase",
//     amount: 25000,
//     date: "Nov 23, 2025",
//     time: "4:20 PM",
//     status: "pending" as const,
//     cardName: "Konga Card",
//     cardLastFour: "9012",
//     merchantName: "Amazon.com",
//     merchantCategory: "Shopping",
//     referenceNumber: "REF-AMZ-001234569",
//     fees: 100,
//   },
// ];

// export function RecentTransactions() {
//   const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
//   const navigate = useNavigate();

//   const displayedTransactions = transactions.slice(0, 3);

//   const handleSeeMore = () => {
//     navigate("/transactions");
//   };

//   return (
//     <>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Recent Transactions</CardTitle>
//           <Button 
//             variant="ghost" 
//             size="sm"
//             onClick={handleSeeMore}
//             className="text-primary hover:text-primary/80"
//           >
//             See More
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {displayedTransactions.map((transaction) => (
//             <div
//               key={transaction.id}
//               onClick={() => setSelectedTransaction(transaction)}
//               className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
//             >
//               <div className="flex items-center gap-4">
//                 <div
//                   className={`p-2 rounded-full ${
//                     transaction.type === "inflow"
//                       ? "bg-green-500/10 text-green-600"
//                       : "bg-red-500/10 text-red-600"
//                   }`}
//                 >
//                   {transaction.type === "inflow" ? (
//                     <ArrowDownLeft className="h-5 w-5" />
//                   ) : (
//                     <ArrowUpRight className="h-5 w-5" />
//                   )}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-foreground">
//                     {transaction.description}
//                   </p>
//                   <p className="text-sm text-muted-foreground">{transaction.date} at {transaction.time}</p>
//                 </div>
//               </div>
//               <div className="text-right flex items-center gap-3">
//                 <div>
//                   <p
//                     className={`font-bold ${
//                       transaction.type === "inflow"
//                         ? "text-green-600"
//                         : "text-foreground"
//                     }`}
//                   >
//                     {transaction.type === "inflow" ? "+" : "-"}₦
//                     {transaction.amount.toLocaleString()}
//                   </p>
//                   <Badge
//                     variant={
//                       transaction.status === "completed" ? "default" : "secondary"
//                     }
//                     className="mt-1"
//                   >
//                     {transaction.status}
//                   </Badge>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {selectedTransaction && (
//         <TransactionDetailsModal
//           isOpen={!!selectedTransaction}
//           onClose={() => setSelectedTransaction(null)}
//           transaction={selectedTransaction}
//         />
//       )}
//     </>
//   );
// }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { TransactionDetailsModal } from "@/components/transactions/TransactionDetailsModal";
import { useNavigate } from "react-router-dom";
import { transactionService } from "@/services/transactionService";
import { transformTransactions, UITransaction } from "@/utils/transactionHelpers";

export function RecentTransactions() {
  const [selectedTransaction, setSelectedTransaction] = useState<UITransaction | null>(null);
  const [transactions, setTransactions] = useState<UITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentTransactions();
  }, []);

  const fetchRecentTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getRecentTransactions(3);
      const transformedData = transformTransactions(data);
      setTransactions(transformedData);
    } catch (err) {
      console.error('Error fetching recent transactions:', err);
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    navigate("/transactions");
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Loading transactions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchRecentTransactions} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSeeMore}
            className="text-primary hover:text-primary/80"
          >
            See More
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {transactions.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "inflow"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {transaction.type === "inflow" ? (
                      <ArrowDownLeft className="h-5 w-5" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date} at {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <div>
                    <p
                      className={`font-bold ${
                        transaction.type === "inflow"
                          ? "text-green-600"
                          : "text-foreground"
                      }`}
                    >
                      {transaction.type === "inflow" ? "+" : "-"}₦
                      {transaction.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant={
                        transaction.status === "completed" ? "default" : "secondary"
                      }
                      className="mt-1"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {selectedTransaction && (
        <TransactionDetailsModal
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      )}
    </>
  );
}
