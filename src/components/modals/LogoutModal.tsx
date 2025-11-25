import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <LogOut className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">Confirm Logout</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-primary hover:bg-orange-dark">
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
