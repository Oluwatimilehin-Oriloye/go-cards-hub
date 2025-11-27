import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VirtualCardDisplay } from "./VirtualCardDisplay";
import { CreateCardButton } from "./CreateCardButton";

interface VirtualCardCarouselProps {
  selectedCardId: string;
  onCardSelect: (cardId: string) => void;
  frozenCards?: Record<string, boolean>;
}

const cards = [
  { id: "temu-card", name: "Temu Card", balance: "₦50.00", lastFour: "6762", cardType: "Mastercard" as const },
  { id: "jumia-card", name: "Jumia Card", balance: "₦150.00", lastFour: "8923", cardType: "Verve" as const },
  { id: "konga-card", name: "Konga Card", balance: "₦75.00", lastFour: "3456", cardType: "Visa" as const },
];

export function VirtualCardCarousel({ selectedCardId, onCardSelect, frozenCards = {} }: VirtualCardCarouselProps) {
  const MAX_CARDS = 3;
  const currentCardCount = cards.length;

  return (
    <div className="relative px-12">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {cards.map((card) => (
            <CarouselItem key={card.id}>
              <div 
                className="cursor-pointer flex justify-center"
                onClick={() => onCardSelect(card.id)}
              >
                <VirtualCardDisplay
                  name={card.name}
                  balance={card.balance}
                  lastFour={card.lastFour}
                  cardType={card.cardType}
                  isSelected={selectedCardId === card.id}
                  isFrozen={frozenCards[card.id] || false}
                />
              </div>
            </CarouselItem>
          ))}
          <CarouselItem>
            <div className="flex justify-center">
              <CreateCardButton currentCardCount={currentCardCount} maxCards={MAX_CARDS} />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
