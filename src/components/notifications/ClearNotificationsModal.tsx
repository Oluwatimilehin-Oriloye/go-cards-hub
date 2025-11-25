import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ClearNotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClearNotificationsModal({
  open,
  onOpenChange,
}: ClearNotificationsModalProps) {
  const handleClear = () => {
    toast.success("All notifications have been cleared");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear All Notifications?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete all your notifications. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClear} className="bg-destructive hover:bg-destructive/90">
            Yes, Clear All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
