import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, HelpCircle } from "lucide-react";
import FAQsModal from "./FAQsModal";
import { useState } from "react";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const handleEmailSupport = () => {
    window.location.href = "mailto:support@gocards.com?subject=GO CARDS Support Request";
  };
  const [openFAQ, setOpenFAQ] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Help & Support</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            We're here to help. Choose how you'd like to reach us.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Email Support */}
          <div className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer" onClick={handleEmailSupport}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Get help via email within 24 hours
                </p>
                <p className="text-sm text-primary font-medium">support@gocards.com</p>
              </div>
            </div>
          </div>

          {/* FAQs
          <div className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">FAQs</h3>
                <p className="text-sm text-muted-foreground">
                  Browse frequently asked questions
                </p>
              </div>
            </div>
          </div> */}

          {/* FAQs Card */}
      <div
        className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer"
        onClick={() => setOpenFAQ(true)}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <HelpCircle className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">FAQs</h3>
            <p className="text-sm text-muted-foreground">
              Browse frequently asked questions
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Modal */}
      <FAQsModal open={openFAQ} onOpenChange={setOpenFAQ} />
    

          {/* Live Chat */}
          <div className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Chat with our support team (Mon-Fri, 9AM-5PM)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
