import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RequestStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RequestStatementModal({ isOpen, onClose }: RequestStatementModalProps) {
  const [selectedCard, setSelectedCard] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const cards = [
    { id: "temu-card", name: "Temu Card" },
    { id: "jumia-card", name: "Jumia Card" },
    { id: "konga-card", name: "Konga Card" },
  ];

  const handleSendStatement = () => {
    if (!selectedCard || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSuccess(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setSelectedCard("");
      setEmail("");
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Request Statement</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Get your card transaction statement via email
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                <Select value={selectedCard} onValueChange={setSelectedCard}>
                  <SelectTrigger id="card">
                    <SelectValue placeholder="Choose a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSendStatement} className="bg-primary hover:bg-primary/90">
                Send Statement
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <CheckCircle2 className="h-16 w-16 text-primary" />
                <DialogTitle className="text-2xl font-bold text-center">
                  Your statement is on its way!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Check your email at {email} for your transaction statement
                </DialogDescription>
              </div>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
