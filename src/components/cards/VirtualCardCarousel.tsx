/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
  status: string;
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
  const [api, setApi] = useState<any>(null);

  // Ensure swiping updates the selected card
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      const selected = cards[index];
      if (selected) onCardSelect(selected.id);
    };

    api.on("select", handleSelect);
    handleSelect(); // initialize selection on mount

    return () => api.off("select", handleSelect);
  }, [api, cards]);

  const currentCardCount = cards.length;

  const getCardType = (type: string): "Mastercard" | "Verve" | "Visa" => {
    const normalized = type.toLowerCase();
    if (normalized.includes("verve")) return "Verve";
    if (normalized.includes("visa")) return "Visa";
    return "Mastercard";
  };

  return (
    <div className="relative px-12">
      <Carousel className="w-full max-w-3xl mx-auto" setApi={setApi}>
        <CarouselContent>
          {cards.map((card) => {
            const lastFour = card.cardNumber.replace(/\s/g, "").slice(-4);
            const currencySymbol = card.currency === "NGN" ? "₦" : "$";
            const isFrozen = card.status === "frozen";

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
                    isFrozen={isFrozen}
                  />
                </div>
              </CarouselItem>
            );
          })}

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
