import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface AccountBalanceCardProps {
  activeCard: string;
}

// Mock data for different cards
const cardBalances: Record<string, { accountBalance: string; cardBalance: string }> = {
  "account-balance": { accountBalance: "₦0.93", cardBalance: "₦0.00" },
  "temu-card": { accountBalance: "₦0.93", cardBalance: "₦50.00" },
  "jumia-card": { accountBalance: "₦0.93", cardBalance: "₦150.00" },
  "konga-card": { accountBalance: "₦0.93", cardBalance: "₦75.00" },
};

export function AccountBalanceCard({ activeCard }: AccountBalanceCardProps) {
  const balances = cardBalances[activeCard] || cardBalances["account-balance"];

  return (
    <Card className="p-6 bg-card border-border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Available Balance */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Available NGN balance</span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-4xl font-bold text-foreground">{balances.accountBalance}</p>
        </div>

        {/* Card Balance */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Card NGN balance</span>
            <Info className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-4xl font-bold text-foreground">{balances.cardBalance}</p>
        </div>
      </div>
    </Card>
  );
}
