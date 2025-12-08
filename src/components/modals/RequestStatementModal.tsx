import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getMyCards } from "@/services/cardService";
import { getProfile } from "@/services/authService";

interface RequestStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Card {
  id: string;
  cardName: string;
}

export function RequestStatementModal({
  isOpen,
  onClose,
}: RequestStatementModalProps) {
  const [selectedCard, setSelectedCard] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [cardsLoading, setCardsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchCards();
      fetchUserEmail();
    }
  }, [isOpen]);

  const fetchCards = async () => {
    try {
      setCardsLoading(true);
      const data = await getMyCards();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setCardsLoading(false);
    }
  };

  const fetchUserEmail = async () => {
    try {
      const profile = await getProfile();
      setEmail(profile.email);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSendStatement = async () => {
    if (!selectedCard || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // TODO: Call your request statement API endpoint here
      // await requestStatement({ cardId: selectedCard, email });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Statement request sent!");
      setSuccess(true);
    } catch (error) {
      console.error("Request statement failed:", error);
      toast.error(
        error.response?.data?.message || "Failed to request statement"
      );
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setSelectedCard("");
      // Don't reset email as it's from user profile
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!success ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Request Statement
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Get your card transaction statement via email
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card">Select Card</Label>
                {cardsLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                ) : (
                  <Select value={selectedCard} onValueChange={setSelectedCard}>
                    <SelectTrigger id="card">
                      <SelectValue placeholder="Choose a card" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ALL Cards</SelectItem>
                      {cards.length === 0 ? (
                        <SelectItem value="no-cards" disabled>
                          No cards available
                        </SelectItem>
                      ) : (
                        cards.map((card) => (
                          <SelectItem key={card.id} value={card.id}>
                            {card.cardName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
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
              <Button
                onClick={handleSendStatement}
                className="bg-primary hover:bg-primary/90"
              >
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
              <Button
                onClick={handleClose}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
