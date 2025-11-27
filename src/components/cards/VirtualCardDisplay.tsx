import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import gtcoLogo from "@/assets/gtco-logo.png";

interface VirtualCardDisplayProps {
  name: string;
  balance: string;
  lastFour: string;
  isSelected?: boolean;
  cardType?: "Mastercard" | "Verve" | "Visa";
  isFrozen?: boolean;
}

export function VirtualCardDisplay({ name, balance, lastFour, isSelected, cardType = "Mastercard", isFrozen = false }: VirtualCardDisplayProps) {
  return (
    <Card className={`
      relative overflow-hidden w-80 h-52 p-6 
      ${isFrozen 
        ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600' 
        : 'bg-gradient-to-br from-primary via-primary/90 to-primary-dark'
      }
      text-white
      transition-all duration-300 rounded-2xl
      ${isSelected ? 'shadow-2xl scale-105' : 'shadow-lg'}
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
      </div>

      {/* Frozen Ice Effect Overlay */}
      {isFrozen && (
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="bg-blue-500/90 backdrop-blur-md px-4 py-2 rounded-full border-2 border-white/50 shadow-lg">
            <p className="text-white font-bold text-sm flex items-center gap-2">
              <span className="text-lg">❄️</span>
              FROZEN
            </p>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <img src={gtcoLogo} alt="GTBank" className="h-8 w-auto" />
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-md border border-white/30">
              <p className="text-xs font-bold text-white tracking-wider">GO CARDS</p>
            </div>
          </div>
        </div>

        {/* Middle Section - Card Number */}
        <div className="space-y-1">
          <p className="text-xs text-white/70 uppercase tracking-wide">Card Number</p>
          <p className="text-xl tracking-widest font-mono">
            **** **** **** {lastFour}
          </p>
          <p className="text-sm text-white/80 mt-2">{name}</p>
        </div>

        {/* Bottom Section */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-white/70 mb-1 uppercase tracking-wide">Balance</p>
            <p className="text-xl font-bold">{balance}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white/90 bg-white/20 px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/30">
              {cardType}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
