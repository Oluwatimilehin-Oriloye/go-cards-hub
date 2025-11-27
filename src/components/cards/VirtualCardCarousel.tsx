// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import { VirtualCardDisplay } from "./VirtualCardDisplay";
// import { CreateCardButton } from "./CreateCardButton";

// interface VirtualCardCarouselProps {
//   selectedCardId: string;
//   onCardSelect: (cardId: string) => void;
// }

// const cards = [
//   { id: "temu-card", name: "Temu Card", balance: "₦50.00", lastFour: "6762", cardType: "Mastercard" as const },
//   { id: "jumia-card", name: "Jumia Card", balance: "₦150.00", lastFour: "8923", cardType: "Verve" as const },
//   { id: "konga-card", name: "Konga Card", balance: "₦75.00", lastFour: "3456", cardType: "Visa" as const },
// ];

// export function VirtualCardCarousel({ selectedCardId, onCardSelect }: VirtualCardCarouselProps) {
//   const MAX_CARDS = 3;
//   const currentCardCount = cards.length;

//   return (
//     <div className="relative px-12">
//       <Carousel className="w-full max-w-3xl mx-auto">
//         <CarouselContent>
//           {cards.map((card) => (
//             <CarouselItem key={card.id}>
//               <div
//                 className="cursor-pointer flex justify-center"
//                 onClick={() => onCardSelect(card.id)}
//               >
//                 <VirtualCardDisplay
//                   name={card.name}
//                   balance={card.balance}
//                   lastFour={card.lastFour}
//                   cardType={card.cardType}
//                   isSelected={selectedCardId === card.id}
//                 />
//               </div>
//             </CarouselItem>
//           ))}
//           <CarouselItem>
//             <div className="flex justify-center">
//               <CreateCardButton currentCardCount={currentCardCount} maxCards={MAX_CARDS} />
//             </div>
//           </CarouselItem>
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// }

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VirtualCardDisplay } from "./VirtualCardDisplay";
import { CreateCardButton } from "./CreateCardButton";

interface Card {
  id: string;
  cardName: string;
  cardNumber: string;
  balance: number;
  currency: string;
  type: string;
}

interface VirtualCardCarouselProps {
  cards: Card[];
  selectedCardId: string;
  onCardSelect: (cardId: string) => void;
  maxCards: number;
}

export function VirtualCardCarousel({
  cards,
  selectedCardId,
  onCardSelect,
  maxCards,
}: VirtualCardCarouselProps) {
  const currentCardCount = cards.length;

  // Determine card type from the type field or default to Mastercard
  const getCardType = (type: string): "Mastercard" | "Verve" | "Visa" => {
    const normalizedType = type.toLowerCase();
    if (normalizedType.includes("verve")) return "Verve";
    if (normalizedType.includes("visa")) return "Visa";
    return "Mastercard";
  };

  return (
    <div className="relative px-12">
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent>
          {cards.map((card) => {
            // Extract last 4 digits from card number
            const lastFour = card.cardNumber.replace(/\s/g, "").slice(-4);
            const currencySymbol = card.currency === "NGN" ? "₦" : "$";

            return (
              <CarouselItem key={card.id}>
                <div
                  className="cursor-pointer flex justify-center"
                  onClick={() => onCardSelect(card.id)}
                >
                  <VirtualCardDisplay
                    name={card.cardName}
                    balance={`${currencySymbol}${card.balance.toLocaleString()}`}
                    lastFour={lastFour}
                    cardType={getCardType(card.type)}
                    isSelected={selectedCardId === card.id}
                  />
                </div>
              </CarouselItem>
            );
          })}

          {/* Show create card button if under limit */}
          {currentCardCount < maxCards && (
            <CarouselItem>
              <div className="flex justify-center">
                <CreateCardButton
                  currentCardCount={currentCardCount}
                  maxCards={maxCards}
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
