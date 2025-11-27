// import { Card } from "@/components/ui/card";
// import { CreditCard, Plus } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface StackedCardsCarouselProps {
//   currentCardCount: number;
//   maxCards: number;
//   onCreateCard: () => void;
// }

// export function StackedCardsCarousel({ currentCardCount, maxCards, onCreateCard }: StackedCardsCarouselProps) {
//   const cards = Array.from({ length: maxCards }, (_, i) => ({
//     id: i,
//     isActive: i < currentCardCount,
//   }));

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-foreground">Your Virtual Cards</h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             You can create up to {maxCards} cards • {currentCardCount} of {maxCards} created
//           </p>
//         </div>
//       </div>

//       <div className="relative flex gap-6 py-4">
//         {cards.map((card, index) => (
//           <Card
//             key={card.id}
//             onClick={!card.isActive ? onCreateCard : undefined}
//             className={cn(
//               "relative w-80 h-48 p-6 transition-all duration-300 cursor-pointer",
//               "flex flex-col justify-between",
//               card.isActive
//                 ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl hover:shadow-2xl hover:scale-105"
//                 : "bg-muted border-2 border-dashed border-border hover:border-primary hover:bg-muted/80"
//             )}
//           >
//             {card.isActive ? (
//               <>
//                 {/* Background Pattern */}
//                 <div className="absolute inset-0 opacity-10">
//                   <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                   <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                 </div>

//                 {/* Card Content */}
//                 <div className="relative">
//                   <CreditCard className="h-8 w-8 text-white/80" />
//                   <p className="text-xs text-white/70 mt-2">Card {index + 1}</p>
//                 </div>

//                 <div>
//                   <p className="text-lg tracking-wider font-mono">**** **** **** ****</p>
//                   <div className="flex items-end justify-between mt-4">
//                     <div>
//                       <p className="text-xs text-white/70 mb-1">Balance</p>
//                       <p className="text-xl font-bold">₦0.00</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
//                       <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4" />
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex flex-col items-center justify-center h-full gap-3">
//                 <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
//                   <Plus className="h-8 w-8 text-muted-foreground" />
//                 </div>
//                 <div className="text-center">
//                   <p className="font-semibold text-foreground">Empty Slot</p>
//                   <p className="text-sm text-muted-foreground mt-1">Click to create card</p>
//                 </div>
//               </div>
//             )}
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { Card as UICard } from "@/components/ui/card";
// import { CreditCard, Plus } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface VirtualCard {
//   id: string;
//   cardName: string;
//   cardNumber: string; // already masked
//   balance: number;
//   currency: string;
// }

// interface StackedCardsCarouselProps {
//   cards: VirtualCard[];       // REAL DATA
//   maxCards: number;
//   onCreateCard: () => void;
// }

// export function StackedCardsCarousel({
//   cards,
//   maxCards,
//   onCreateCard
// }: StackedCardsCarouselProps) {

//   const cardSlots = Array.from({ length: maxCards });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-foreground">Your Virtual Cards</h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             You can create up to {maxCards} cards • {cards.length} of {maxCards} created
//           </p>
//         </div>
//       </div>

//       {/* CARD CAROUSEL */}
//       <div className="relative flex gap-6 py-4">
//         {cardSlots.map((_, index) => {
//           const card = cards[index]; // real card for this slot
//           const isActive = Boolean(card);

//           return (
//             <UICard
//               key={index}
//               onClick={!isActive ? onCreateCard : undefined}
//               className={cn(
//                 "relative w-80 h-48 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between",
//                 isActive
//                   ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl hover:shadow-2xl hover:scale-105"
//                   : "bg-muted border-2 border-dashed border-border hover:border-primary hover:bg-muted/80"
//               )}
//             >
//               {isActive ? (
//                 <>
//                   {/* Background Glow */}
//                   <div className="absolute inset-0 opacity-10">
//                     <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                     <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                   </div>

//                   {/* Card Header */}
//                   <div className="relative">
//                     <CreditCard className="h-8 w-8 text-white/80" />
//                     <p className="text-xs text-white/70 mt-2">{card?.cardName}</p>
//                   </div>

//                   {/* Card Details */}
//                   <div className="relative">
//                     <p className="text-lg tracking-wider font-mono">
//                       {card.cardNumber}
//                     </p>

//                     <div className="flex items-end justify-between mt-4">
//                       <div>
//                         <p className="text-xs text-white/70 mb-1">Balance</p>
//                         <p className="text-xl font-bold">
//                           {card.currency === "NGN" ? "₦" : "$"}
//                           {card.balance.toLocaleString()}
//                         </p>
//                       </div>

//                       {/* Two overlapping circles */}
//                       <div className="flex gap-2">
//                         <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
//                         <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4" />
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 // EMPTY SLOT
//                 <div className="flex flex-col items-center justify-center h-full gap-3">
//                   <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
//                     <Plus className="h-8 w-8 text-muted-foreground" />
//                   </div>
//                   <div className="text-center">
//                     <p className="font-semibold text-foreground">Empty Slot</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Click to create card
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </UICard>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

//Ikeseh Version
// import { Card as UICard } from "@/components/ui/card";
// import { CreditCard, Plus } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface VirtualCard {
//   id: string;
//   cardName: string;
//   cardNumber: string;
//   balance: number;
//   currency: string;
// }

// interface StackedCardsCarouselProps {
//   cards: VirtualCard[];
//   maxCards: number;
//   onCreateCard: () => void;
// }

// export function StackedCardsCarousel({
//   cards,
//   maxCards,
//   onCreateCard,
// }: StackedCardsCarouselProps) {
//   // SAFETY: prevents page from going blank if cards is undefined
//   const safeCards = Array.isArray(cards) ? cards : [];

//   const cardSlots = Array.from({ length: maxCards });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-foreground">
//             Your Virtual Cards
//           </h2>
//           <p className="text-sm text-muted-foreground mt-1">
//             You can create up to {maxCards} cards • {safeCards.length} of{" "}
//             {maxCards} created
//           </p>
//         </div>
//       </div>

//       <div className="relative flex gap-6 py-4">
//         {cardSlots.map((_, index) => {
//           const card = safeCards[index];
//           const isActive = Boolean(card);

//           return (
//             <UICard
//               key={index}
//               onClick={!isActive ? onCreateCard : undefined}
//               className={cn(
//                 "relative w-80 h-48 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between",
//                 isActive
//                   ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl hover:shadow-2xl hover:scale-105"
//                   : "bg-muted border-2 border-dashed border-border hover:border-primary hover:bg-muted/80"
//               )}
//             >
//               {isActive ? (
//                 <>
//                   {/* Glow */}
//                   <div className="absolute inset-0 opacity-10">
//                     <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                     <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
//                   </div>

//                   <div className="relative">
//                     <CreditCard className="h-8 w-8 text-white/80" />
//                     <p className="text-xs text-white/70 mt-2">
//                       {card.cardName}
//                     </p>
//                   </div>

//                   <div className="relative">
//                     <p className="text-lg tracking-wider font-mono">
//                       {card.cardNumber}
//                     </p>

//                     <div className="flex items-end justify-between mt-4">
//                       <div>
//                         <p className="text-xs text-white/70 mb-1">Balance</p>
//                         <p className="text-xl font-bold">
//                           {card.currency === "NGN" ? "₦" : "$"}
//                           {card.balance.toLocaleString()}
//                         </p>
//                       </div>

//                       <div className="flex gap-2">
//                         <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
//                         <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4" />
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full gap-3">
//                   <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
//                     <Plus className="h-8 w-8 text-muted-foreground" />
//                   </div>
//                   <div className="text-center">
//                     <p className="font-semibold text-foreground">Empty Slot</p>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       Click to create card
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </UICard>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { Card as UICard } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface VirtualCard {
  id: string;
  cardName: string;
  cardNumber: string;
  balance: number;
  currency: string;
}

interface StackedCardsCarouselProps {
  cards: VirtualCard[];
  maxCards: number;
  onCreateCard: () => void;
}

export function StackedCardsCarousel({
  cards,
  maxCards,
  onCreateCard,
}: StackedCardsCarouselProps) {
  // SAFETY: prevents page from going blank if cards is undefined
  const safeCards = Array.isArray(cards) ? cards : [];

  const cardSlots = Array.from({ length: maxCards });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Your Virtual Cards
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            You can create up to {maxCards} cards • {safeCards.length} of{" "}
            {maxCards} created
          </p>
        </div>
      </div>

      <div className="relative flex gap-6 py-4">
        {cardSlots.map((_, index) => {
          const card = safeCards[index];
          const isActive = Boolean(card);

          return (
            <UICard
              key={index}
              onClick={!isActive ? onCreateCard : undefined}
              className={cn(
                "relative w-80 h-48 p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between",
                isActive
                  ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "bg-muted border-2 border-dashed border-border hover:border-primary hover:bg-muted/80"
              )}
            >
              {isActive ? (
                <>
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
                  </div>

                  <div className="relative">
                    <CreditCard className="h-8 w-8 text-white/80" />
                    <p className="text-xs text-white/70 mt-2">
                      {card.cardName}
                    </p>
                  </div>

                  <div className="relative">
                    <p className="text-lg tracking-wider font-mono">
                      {card.cardNumber}
                    </p>

                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <p className="text-xs text-white/70 mb-1">Balance</p>
                        <p className="text-xl font-bold">
                          {card.currency === "NGN" ? "₦" : "$"}
                          {card.balance.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
                        <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4" />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Empty Slot</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click to create card
                    </p>
                  </div>
                </div>
              )}
            </UICard>
          );
        })}
      </div>
    </div>
  );
}
