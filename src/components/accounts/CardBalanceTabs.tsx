import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CardBalanceTabsProps {
  activeCard: string;
  onCardChange: (card: string) => void;
}

const cards = [
  { id: "account-balance", label: "Account Balance" },
  { id: "temu-card", label: "Temu Card" },
  { id: "jumia-card", label: "Jumia Card" },
  { id: "konga-card", label: "Konga Card" },
];

export function CardBalanceTabs({ activeCard, onCardChange }: CardBalanceTabsProps) {
  return (
    <div className="flex items-center justify-between">
      <Tabs value={activeCard} onValueChange={onCardChange} className="w-full">
        <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full justify-start">
          {cards.map((card) => (
            <TabsTrigger
              key={card.id}
              value={card.id}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground px-6 py-3"
            >
              {card.label}
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
