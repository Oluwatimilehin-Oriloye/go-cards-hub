import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardName: string;
  balance: number;
  onDelete: (reason: string) => void;
}

export function DeleteCardModal({
  isOpen,
  onClose,
  cardName,
  balance,
  onDelete,
}: DeleteCardModalProps) {
  const [reason, setReason] = useState("");

  const handleDelete = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for deletion");
      return;
    }
    onDelete(reason);
    toast.success(`${cardName} deleted successfully`);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setTimeout(() => {
      setReason("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                Delete Card
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {cardName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg space-y-3">
            <p className="text-sm font-semibold text-destructive flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Important Warnings
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>
                  All remaining funds (₦{balance.toLocaleString()}) will be
                  returned to your main account
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>
                  This card will be unlinked from all platforms (Temu, Jumia,
                  etc.)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>Card number and details will be permanently deleted</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>This action cannot be undone</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Why are you deleting this card? *</Label>
            <Textarea
              id="reason"
              placeholder="Please tell us your reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-destructive hover:bg-destructive/90"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Delete Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
