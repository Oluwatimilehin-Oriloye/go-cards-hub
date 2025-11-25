import { Bell, CreditCard, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Notification } from "@/pages/Notifications";

interface NotificationsListProps {
  onNotificationClick: (notification: Notification) => void;
  onClearAll: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New card added successfully",
    message: "Your Temu Card is now active and ready to use.",
    timestamp: "2 minutes ago",
    read: false,
    type: "success",
    cardName: "Temu Card",
    referenceId: "REF-2025-001",
  },
  {
    id: "2",
    title: "₦200 deducted for Temu purchase",
    message: "Transaction completed successfully at Temu Marketplace.",
    timestamp: "15 minutes ago",
    read: false,
    type: "info",
    cardName: "Temu Card",
    amount: 200,
    referenceId: "REF-2025-008",
  },
  {
    id: "3",
    title: "Card declined on Konga — insufficient funds",
    message: "Your transaction was declined due to insufficient balance.",
    timestamp: "1 hour ago",
    read: true,
    type: "error",
    cardName: "Konga Card",
    amount: 1500,
    referenceId: "REF-2025-009",
  },
  {
    id: "4",
    title: "Card frozen by user",
    message: "Your Konga Card has been temporarily frozen.",
    timestamp: "2 hours ago",
    read: true,
    type: "warning",
    cardName: "Konga Card",
    referenceId: "REF-2025-010",
  },
  {
    id: "5",
    title: "New card creation failed — try again",
    message: "There was an error creating your virtual card. Please try again.",
    timestamp: "3 hours ago",
    read: true,
    type: "error",
    referenceId: "REF-2025-011",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  const iconClass = "h-5 w-5";
  
  switch (type) {
    case "success":
      return <CheckCircle className={`${iconClass} text-success`} />;
    case "error":
      return <XCircle className={`${iconClass} text-destructive`} />;
    case "warning":
      return <AlertCircle className={`${iconClass} text-orange-500`} />;
    default:
      return <CreditCard className={`${iconClass} text-primary`} />;
  }
};

export function NotificationsList({ onNotificationClick, onClearAll }: NotificationsListProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">All Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-primary">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onClearAll}>
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => onNotificationClick(notification)}
            className={`
              flex items-start gap-4 p-4 rounded-lg cursor-pointer
              transition-colors hover:bg-muted/50
              ${!notification.read ? "bg-success-bg/10 border-l-4 border-primary" : "border-l-4 border-transparent"}
            `}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                {notification.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {notification.message}
              </p>
              {notification.cardName && (
                <p className="text-xs text-muted-foreground mt-1">
                  Card: {notification.cardName}
                </p>
              )}
            </div>

            {/* Timestamp */}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {notification.timestamp}
            </span>

            {/* Unread indicator */}
            {!notification.read && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            )}
          </div>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </Card>
  );
}
