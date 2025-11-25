// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface CardBalanceTabsProps {
//   activeCard: string;
//   onCardChange: (card: string) => void;
// }

// const cards = [
//   { id: "account-balance", label: "Account Balance" },
//   { id: "temu-card", label: "Temu Card" },
//   { id: "jumia-card", label: "Jumia Card" },
//   { id: "konga-card", label: "Konga Card" },
// ];

// export function CardBalanceTabs({ activeCard, onCardChange }: CardBalanceTabsProps) {
//   return (
//     <div className="flex items-center justify-between">
//       <Tabs value={activeCard} onValueChange={onCardChange} className="w-full">
//         <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full justify-start">
//           {cards.map((card) => (
//             <TabsTrigger
//               key={card.id}
//               value={card.id}
//               className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-6 py-3"
//             >
//               {card.label}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </Tabs>

//       <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
//         Add New Card +
//       </button>
//     </div>
//   );
// }

// src/components/accounts/CardBalanceTabs.tsx (Updated for Consistency)
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardBalance } from "@/services/accountService";
import { cn } from "@/lib/utils"; // You may need this if your project uses Tailwind utility functions

interface CardBalanceTabsProps {
  activeCard: string;
  onCardChange: (card: string) => void;
  // This prop will be an array of CardBalance objects, or undefined if still loading
  cardList: CardBalance[] | undefined;
}

// 🚨 UPDATED: Define the mandatory first item (Main Account Balance)
// Ensure the key for display is 'cardName' to match the dynamic list structure
const MAIN_ACCOUNT_TAB = {
  id: "account-balance",
  cardName: "Account Balance",
  balance: 0,
};

export function CardBalanceTabs({
  activeCard,
  onCardChange,
  cardList,
}: CardBalanceTabsProps) {
  // 1. Combine the static main account tab with the dynamic card list
  const dynamicCards = cardList || [];
  // We cast the dynamic list items to match the MAIN_ACCOUNT_TAB structure's required fields
  const allCards = [
    MAIN_ACCOUNT_TAB,
    ...dynamicCards.map((card) => ({
      id: card.cardId,
      cardName: card.cardName,
      balance: card.balance,
    })),
  ];

  return (
    <div className="flex items-center justify-between">
      <Tabs value={activeCard} onValueChange={onCardChange} className="w-full">
        <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full justify-start">
          {allCards.map((card) => (
            <TabsTrigger
              key={card.id}
              value={card.id}
              className={cn(
                "rounded-none border-b-2 border-transparent px-6 py-3",
                "data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground"
              )}
            >
              {card.cardName}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
        Add New Card +
      </button>
    </div>
  );
}
