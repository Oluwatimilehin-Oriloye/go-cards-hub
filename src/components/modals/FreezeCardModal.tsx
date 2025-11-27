import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Snowflake } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FreezeCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardName: string;
  onFreeze: (duration: string) => void;
}

export function FreezeCardModal({ isOpen, onClose, cardName, onFreeze }: FreezeCardModalProps) {
  const [duration, setDuration] = useState("");

  const handleFreeze = () => {
    if (!duration) {
      toast.error("Please select a freeze duration");
      return;
    }
    onFreeze(duration);
    toast.success(`${cardName} frozen for ${duration}`);
    onClose();
    resetModal();
  };

  const resetModal = () => {
    setTimeout(() => {
      setDuration("");
    }, 300);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Snowflake className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">Freeze Card</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {cardName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium text-foreground">What happens when you freeze?</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All transactions will be blocked</li>
              <li>• Your funds remain safe in the card</li>
              <li>• You can unfreeze anytime</li>
              <li>• Card details stay the same</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">How long do you want to freeze?</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 hour">1 hour</SelectItem>
                <SelectItem value="24 hours">24 hours</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="1 month">1 month</SelectItem>
                <SelectItem value="indefinitely">Indefinitely (until I unfreeze)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleFreeze} className="bg-blue-500 hover:bg-blue-600">
            <Snowflake className="mr-2 h-4 w-4" />
            Freeze Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
