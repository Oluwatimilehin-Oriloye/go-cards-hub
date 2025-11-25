// import { Card } from "@/components/ui/card";
// import { Info } from "lucide-react";

// interface AccountBalanceCardProps {
//   activeCard: string;
// }

// // Mock data for different cards
// const cardBalances: Record<string, { accountBalance: string; cardBalance: string }> = {
//   "account-balance": { accountBalance: "₦0.93", cardBalance: "₦0.00" },
//   "temu-card": { accountBalance: "₦0.93", cardBalance: "₦50.00" },
//   "jumia-card": { accountBalance: "₦0.93", cardBalance: "₦150.00" },
//   "konga-card": { accountBalance: "₦0.93", cardBalance: "₦75.00" },
// };

// export function AccountBalanceCard({ activeCard }: AccountBalanceCardProps) {
//   const balances = cardBalances[activeCard] || cardBalances["account-balance"];

//   return (
//     <Card className="p-6 bg-card border-border shadow-sm">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Available Balance */}
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-sm text-muted-foreground">Available NGN balance</span>
//             <Info className="h-4 w-4 text-muted-foreground" />
//           </div>
//           <p className="text-4xl font-bold text-foreground">{balances.accountBalance}</p>
//         </div>

//         {/* Card Balance */}
//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <span className="text-sm text-muted-foreground">Card NGN balance</span>
//             <Info className="h-4 w-4 text-muted-foreground" />
//           </div>
//           <p className="text-4xl font-bold text-foreground">{balances.cardBalance}</p>
//         </div>
//       </div>
//     </Card>
//   );
// }

// src/components/accounts/AccountBalanceCard.tsx (UPDATED for correct lookup)
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { AccountSummaryData } from "@/services/accountService";

interface AccountBalanceCardProps {
  activeCard: string;
  summaryData: AccountSummaryData | null;
}

export function AccountBalanceCard({
  activeCard,
  summaryData,
}: AccountBalanceCardProps) {
  // 1. Handle Loading/No Data
  if (!summaryData) {
    return (
      <Card className="p-6 bg-card border-border shadow-sm">
        Loading balances...
      </Card>
    );
  }

  // 2. Determine Card Balance based on activeCard prop
  let cardBalance: number = 0;
  let cardName: string = "Card";

  if (activeCard === "account-balance") {
    // If "account-balance" is selected, the second panel should show NGN 0.00
    cardBalance = 0.0;
    cardName = "Main Account";
  } else {
    // 🚨 CRITICAL FIX: Find the balance using card.cardId which matches the dynamic data structure
    const activeCardData = summaryData.cardBalances.find(
      (c) => c.cardId === activeCard
    );
    if (activeCardData) {
      cardBalance = activeCardData.balance;
      cardName = activeCardData.cardName;
    } else {
      cardName = "Unknown Card";
    }
  }

  // 3. Currency Formatting
  // Ensure main account balance is treated as a number
  const mainAccountBalance = Number(summaryData.accountBalance) || 0;
  const currency = summaryData.currency;

  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  };

  const formattedAccountBalance = formatCurrency(mainAccountBalance, currency);
  const formattedCardBalance = formatCurrency(cardBalance, currency);

  return (
    <Card className="p-6 bg-card border-border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available NGN Balance (Always shows the main balance) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              Available {currency} balance
            </span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-4xl font-bold text-foreground">
            {formattedAccountBalance}
          </p>
        </div>

        {/* Card Balance (Shows the balance of the currently selected item) */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              {cardName} {currency} balance
            </span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-4xl font-bold text-foreground">
            {formattedCardBalance}
          </p>
        </div>
      </div>
    </Card>
  );
}
