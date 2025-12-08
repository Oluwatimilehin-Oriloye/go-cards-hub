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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { deleteCard } from "@/services/cardService";

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId?: string;
  cardName?: string;
  balance?: number;
  onDeleteSuccess: () => void;
}

export function DeleteCardModal({
  isOpen,
  onClose,
  cardId,
  cardName,
  balance = 0,
  onDeleteSuccess,
}: DeleteCardModalProps) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Debug: Log props when modal opens
  useEffect(() => {
    if (isOpen) {
      console.log("DeleteCardModal opened with:", {
        cardId,
        cardName,
        balance,
      });
      if (!cardId) {
        console.error("❌ cardId is undefined!");
        toast.error("Card information is missing. Please try again.");
      }
    }
  }, [isOpen, cardId, cardName, balance]);

  const handleDelete = async () => {
    if (!cardId) {
      toast.error("Card information is missing. Please close and try again.");
      return;
    }

    if (!reason.trim()) {
      toast.error("Please provide a reason for deletion");
      return;
    }

    try {
      setLoading(true);
      console.log("Deleting card:", cardId);
      await deleteCard(cardId);
      toast.success(`${cardName || "Card"} deleted successfully`);
      onDeleteSuccess(); // Refresh cards list
      onClose();
      resetModal();
    } catch (error) {
      console.error("Failed to delete card:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to delete card";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setTimeout(() => {
      setReason("");
    }, 300);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      resetModal();
    }
  };

  // Don't render if cardId is missing
  if (isOpen && !cardId) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-destructive">
              Error
            </DialogTitle>
            <DialogDescription>
              Card information is missing. Please close this dialog and try
              again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

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
                {cardName || "Card"}
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
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-destructive hover:bg-destructive/90"
            disabled={loading}
          >
            {loading ? (
              "Deleting..."
            ) : (
              <>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Delete Card
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
