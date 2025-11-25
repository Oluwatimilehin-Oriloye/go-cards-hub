import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const transactions = [
  {
    id: 1,
    date: "13 August 2025, 18:48:45",
    amount: "₦ 86.35",
    type: "Withdraw",
    description: "Ifenna Nwafor",
    status: "Completed",
  },
  {
    id: 2,
    date: "13 August 2025, 18:41:53",
    amount: "₦ 1,600.00",
    type: "Swap",
    description: "NGN to EUR",
    status: "Completed",
  },
  {
    id: 3,
    date: "13 August 2025, 18:35:14",
    amount: "₦ 1,600.00",
    type: "Deposit",
    description: "IFENNA BLOSSOM NWAFOR",
    status: "Completed",
  },
  {
    id: 4,
    date: "14 July 2025, 17:35:15",
    amount: "₦ 1,552.00",
    type: "Withdraw",
    description: "IKENGA OKWUTE",
    status: "Completed",
  },
  {
    id: 5,
    date: "03 July 2025, 02:01:20",
    amount: "₦ 5.00",
    type: "Withdraw",
    description: "Card deposit",
    status: "Completed",
  },
];

export function RecentTransactions() {
  const { t } = useTranslation();
  
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">{t('dashboard.recentTransactions')}</h2>
        <button className="text-sm font-medium text-primary hover:text-orange-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded">
          {t('common.seeAll')}
        </button>
      </div>

      <Card className="overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('transactions.date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('transactions.amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('transactions.type')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('transactions.description')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t('transactions.status')}
                </th>
                <th className="w-12 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="group cursor-pointer transition-colors hover:bg-muted/50 focus-within:bg-muted/50"
                  tabIndex={0}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-foreground">
                    {transaction.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                    {transaction.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge className="bg-success-bg text-success hover:bg-success-bg">
                      ● {transaction.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view - stacked cards */}
        <div className="block sm:hidden divide-y divide-border">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-foreground">{transaction.amount}</p>
                  <p className="text-sm text-muted-foreground">{transaction.type}</p>
                </div>
                <Badge className="bg-success-bg text-success hover:bg-success-bg">
                  {transaction.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
