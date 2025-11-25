import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  CreditCard, 
  DollarSign, 
  Link2, 
  Snowflake, 
  Trash2,
  AlertTriangle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { TimelineEvent } from "@/pages/Notifications";

interface ActivityTimelineProps {
  onEventClick: (event: TimelineEvent) => void;
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "created",
    title: "Card Created",
    description: "Your virtual card has been successfully generated.",
    timestamp: "7:02 PM",
    cardName: "Temu Card",
    referenceId: "REF-2025-001",
    status: "success",
  },
  {
    id: "2",
    type: "funded",
    title: "Card Funded",
    description: "₦5,000 was added to your card balance.",
    timestamp: "7:03 PM",
    cardName: "Temu Card",
    amount: 5000,
    referenceId: "REF-2025-002",
    status: "success",
  },
  {
    id: "3",
    type: "linked",
    title: "Card Linked to Service",
    description: "Your card is now linked to Jumia Pay.",
    timestamp: "7:04 PM",
    cardName: "Jumia Card",
    merchant: "Jumia Pay",
    referenceId: "REF-2025-003",
    status: "success",
  },
  {
    id: "4",
    type: "transaction_attempted",
    title: "Card Transaction Attempted",
    description: "A payment of ₦3,200 was attempted.",
    timestamp: "7:05 PM",
    cardName: "Jumia Card",
    amount: 3200,
    merchant: "Jumia Marketplace",
    referenceId: "REF-2025-004",
    status: "pending",
  },
  {
    id: "5",
    type: "transaction_success",
    title: "Card Transaction Successful",
    description: "Your transaction was successfully processed.",
    timestamp: "7:10 PM",
    cardName: "Jumia Card",
    amount: 3200,
    merchant: "Jumia Marketplace",
    referenceId: "REF-2025-005",
    status: "success",
  },
  {
    id: "6",
    type: "transaction_failed",
    title: "Card Transaction Failed",
    description: "Your payment was declined.",
    timestamp: "7:23 PM",
    cardName: "Konga Card",
    amount: 1500,
    merchant: "Konga Store",
    referenceId: "REF-2025-006",
    status: "failed",
  },
  {
    id: "7",
    type: "frozen",
    title: "Card Frozen",
    description: "Your card is temporarily frozen and cannot be used.",
    timestamp: "7:32 PM",
    cardName: "Konga Card",
    referenceId: "REF-2025-007",
    status: "warning",
  },
];

const getEventIcon = (type: TimelineEvent["type"], status: TimelineEvent["status"]) => {
  const iconClass = "h-5 w-5";
  
  if (status === "success") {
    return <CheckCircle2 className={`${iconClass} text-success`} />;
  }
  if (status === "failed") {
    return <XCircle className={`${iconClass} text-destructive`} />;
  }
  if (status === "warning") {
    return <AlertTriangle className={`${iconClass} text-orange-500`} />;
  }
  
  switch (type) {
    case "created":
      return <CreditCard className={`${iconClass} text-primary`} />;
    case "funded":
      return <DollarSign className={`${iconClass} text-success`} />;
    case "linked":
      return <Link2 className={`${iconClass} text-primary`} />;
    case "frozen":
      return <Snowflake className={`${iconClass} text-blue-500`} />;
    case "deleted":
      return <Trash2 className={`${iconClass} text-destructive`} />;
    default:
      return <Clock className={`${iconClass} text-muted-foreground`} />;
  }
};

export function ActivityTimeline({ onEventClick }: ActivityTimelineProps) {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Activity Timeline</h2>
        <p className="text-sm text-muted-foreground mt-1">Track your card events in real-time</p>
      </div>

      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
        {mockEvents.map((event, index) => (
          <div 
            key={event.id} 
            className="relative pl-8 cursor-pointer hover:bg-muted/50 p-2 -ml-2 rounded-lg transition-colors"
            onClick={() => onEventClick(event)}
          >
            {/* Timeline Line */}
            {index !== mockEvents.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-primary/30" />
            )}
            
            {/* Icon Container */}
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              {getEventIcon(event.type, event.status)}
            </div>

            {/* Content */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-medium ${
                  event.status === "success" ? "text-success" :
                  event.status === "failed" ? "text-destructive" :
                  event.status === "warning" ? "text-orange-500" :
                  "text-foreground"
                }`}>
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {event.description}
                </p>
                {event.cardName && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Card: {event.cardName}
                  </p>
                )}
              </div>
              <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">
                {event.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
