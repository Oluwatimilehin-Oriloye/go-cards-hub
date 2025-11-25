import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VirtualCardDisplayProps {
  name: string;
  balance: string;
  lastFour: string;
  isSelected?: boolean;
}

export function VirtualCardDisplay({ name, balance, lastFour, isSelected }: VirtualCardDisplayProps) {
  // Randomize card network
  const networks = ["Mastercard", "Verve", "Visa"];
  const randomNetwork = networks[Math.floor(Math.random() * networks.length)];

  return (
    <Card className={`
      relative overflow-hidden w-96 h-56 p-6 
      bg-gradient-to-br from-primary via-orange-dark to-gray-900
      text-white
      transition-all duration-300 rounded-2xl
      ${isSelected ? 'shadow-2xl scale-105' : 'shadow-lg'}
    `}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 -right-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
      </div>

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <CreditCard className="h-10 w-10 text-white/90" />
          <div className="text-right">
            {/* GTBank Logo */}
            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
              <p className="text-sm font-bold text-white">GO CARDS</p>
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
            <p className="text-2xl font-bold">{balance}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white/90 bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm">
              {randomNetwork}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
