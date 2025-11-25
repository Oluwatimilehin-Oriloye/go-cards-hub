import { CreditCard, Calendar, Hash, DollarSign, Store, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { TimelineEvent } from "@/pages/Notifications";
import { toast } from "sonner";

interface TrackingDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: TimelineEvent | null;
}

export function TrackingDetailsModal({
  open,
  onOpenChange,
  event,
}: TrackingDetailsModalProps) {
  if (!event) return null;

  const handleReportIssue = () => {
    toast.info("Issue reporting functionality coming soon");
    onOpenChange(false);
  };

  const getStatusBadge = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-success">Complete</Badge>;
      case "failed":
        return <Badge className="bg-destructive">Failed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "warning":
        return <Badge className="bg-orange-500">Warning</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Event Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title & Status */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
            </div>
            {getStatusBadge(event.status)}
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="space-y-4">
            {event.cardName && (
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Card Name</Label>
                  <p className="text-sm font-medium">{event.cardName}</p>
                </div>
              </div>
            )}

            {event.amount && (
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Amount</Label>
                  <p className="text-sm font-medium">₦{event.amount.toLocaleString()}</p>
                </div>
              </div>
            )}

            {event.merchant && (
              <div className="flex items-start gap-3">
                <Store className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Merchant</Label>
                  <p className="text-sm font-medium">{event.merchant}</p>
                </div>
              </div>
            )}

            {event.referenceId && (
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Reference ID</Label>
                  <p className="text-sm font-mono">{event.referenceId}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Timestamp</Label>
                <p className="text-sm font-medium">{event.timestamp}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReportIssue} className="flex-1">
              <AlertCircle className="h-4 w-4 mr-2" />
              Report an Issue
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
