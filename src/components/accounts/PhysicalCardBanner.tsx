import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight } from "lucide-react";

export function PhysicalCardBanner() {
  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Request for Physical Card</h2>
          <p className="text-muted-foreground max-w-xl">
            Order a secure GTCO physical card and get it delivered to you.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-orange-dark">
            Request Physical Card
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-full">
            <CreditCard className="h-24 w-24 text-primary" />
          </div>
        </div>
      </div>
    </Card>
  );
}
