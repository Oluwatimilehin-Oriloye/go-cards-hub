import { CreditCard, Calendar, Hash, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Notification } from "@/pages/Notifications";

interface NotificationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notification: Notification | null;
}

export function NotificationDetailsModal({
  open,
  onOpenChange,
  notification,
}: NotificationDetailsModalProps) {
  if (!notification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Notification Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title & Message */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground">
              {notification.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {notification.message}
            </p>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="space-y-4">
            {notification.cardName && (
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Card</Label>
                  <p className="text-sm font-medium">{notification.cardName}</p>
                </div>
              </div>
            )}

            {notification.amount && (
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Amount</Label>
                  <p className="text-sm font-medium">₦{notification.amount.toLocaleString()}</p>
                </div>
              </div>
            )}

            {notification.referenceId && (
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Reference ID</Label>
                  <p className="text-sm font-mono">{notification.referenceId}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Time</Label>
                <p className="text-sm font-medium">{notification.timestamp}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
