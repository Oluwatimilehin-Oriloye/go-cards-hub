import {
    Dialog,
    DialogContent,
  } from "@/components/ui/dialog";
  import { CheckCircle2 } from "lucide-react";
  
  interface SuccessModalProps {
    open: boolean;
    title: string;
    message: string;
  }
  
  export const SuccessModal = ({ open, title, message }: SuccessModalProps) => {
    return (
      <Dialog open={open}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground text-center">{message}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  