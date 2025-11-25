import { 
  CheckCircle2, 
  Circle,
  XCircle, 
  CreditCard, 
  Package,
  Truck,
  MapPin,
  Home,
  Key,
  Shield
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  status: "complete" | "active" | "pending" | "failed";
}

const physicalCardSteps: TimelineStep[] = [
  {
    id: "1",
    title: "Card Created",
    description: "Your virtual card request has been initiated",
    timestamp: "Nov 18, 2025 • 2:30 PM",
    status: "complete",
  },
  {
    id: "2",
    title: "Card Issued",
    description: "Physical card has been issued and is being prepared",
    timestamp: "Nov 18, 2025 • 3:15 PM",
    status: "complete",
  },
  {
    id: "3",
    title: "Card in Processing",
    description: "Your card is being manufactured and personalized",
    timestamp: "Nov 18, 2025 • 4:00 PM",
    status: "complete",
  },
  {
    id: "4",
    title: "Card in the Bank",
    description: "Card has been delivered to GTBank processing center",
    timestamp: "Nov 19, 2025 • 10:00 AM",
    status: "active",
  },
  {
    id: "5",
    title: "Card Dispatched",
    description: "Your card has been dispatched for delivery",
    status: "pending",
  },
  {
    id: "6",
    title: "Card On Its Way",
    description: "Card is in transit to your delivery address",
    status: "pending",
  },
  {
    id: "7",
    title: "Card Arriving",
    description: "Card is arriving at your local delivery center",
    status: "pending",
  },
  {
    id: "8",
    title: "Card At Your Doorstep",
    description: "Card has been delivered to your address",
    status: "pending",
  },
  {
    id: "9",
    title: "Card Received",
    description: "You've confirmed receipt of your physical card",
    status: "pending",
  },
  {
    id: "10",
    title: "Card Activated",
    description: "Your physical card is now active and ready to use",
    status: "pending",
  },
  {
    id: "11",
    title: "Physical PIN Created",
    description: "You've set up your secure PIN for ATM withdrawals",
    status: "pending",
  },
  {
    id: "12",
    title: "Card Fully Set Up",
    description: "Your card is fully configured and ready for all transactions",
    status: "pending",
  },
];

const getStepIcon = (index: number, status: TimelineStep["status"]) => {
  const iconClass = "h-5 w-5";
  
  if (status === "complete") {
    return <CheckCircle2 className={`${iconClass} text-primary`} />;
  }
  if (status === "failed") {
    return <XCircle className={`${iconClass} text-destructive`} />;
  }
  if (status === "active") {
    return <Circle className={`${iconClass} text-primary fill-primary`} />;
  }

  // Pending icons based on step
  const icons = [
    CreditCard, // Created
    Package, // Issued
    Shield, // Processing
    MapPin, // In Bank
    Truck, // Dispatched
    Truck, // On Its Way
    MapPin, // Arriving
    Home, // At Doorstep
    CheckCircle2, // Received
    Shield, // Activated
    Key, // PIN Created
    CheckCircle2, // Fully Set Up
  ];

  const Icon = icons[index] || Circle;
  return <Icon className={`${iconClass} text-muted-foreground`} />;
};

interface PhysicalCardTimelineProps {
  onStepClick?: (step: any) => void;
}

export function PhysicalCardTimeline({ onStepClick }: PhysicalCardTimelineProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Physical Card Tracking</h2>
        <p className="text-muted-foreground mt-1">
          Monitor your physical card journey from creation to activation
        </p>
      </div>

      <div className="relative">
        {physicalCardSteps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "relative pb-8 group",
              index === physicalCardSteps.length - 1 && "pb-0"
            )}
            onClick={() => onStepClick?.(step)}
          >
            {/* Vertical Line */}
            {index < physicalCardSteps.length - 1 && (
              <div
                className={cn(
                  "absolute left-[11px] top-6 w-0.5 h-full",
                  step.status === "complete" || step.status === "active"
                    ? "bg-primary"
                    : "bg-border"
                )}
              />
            )}

            {/* Timeline Item */}
            <div className="relative flex items-start gap-4 cursor-pointer hover:bg-muted/50 p-3 rounded-lg transition-all">
              {/* Icon */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-6 h-6 rounded-full",
                  step.status === "complete" && "bg-primary/10",
                  step.status === "active" && "bg-primary/20 ring-4 ring-primary/20",
                  step.status === "pending" && "bg-muted",
                  step.status === "failed" && "bg-destructive/10"
                )}
              >
                {getStepIcon(index, step.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "font-semibold",
                        step.status === "complete" && "text-foreground",
                        step.status === "active" && "text-primary font-bold",
                        step.status === "pending" && "text-muted-foreground",
                        step.status === "failed" && "text-destructive"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  </div>
                  {step.timestamp && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {step.timestamp}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
