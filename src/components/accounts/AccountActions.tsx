import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export function AccountActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        className="bg-primary text-primary-foreground hover:bg-orange-dark px-6"
        size="lg"
      >
        Fund Card
      </Button>
      
      <Button 
        variant="outline" 
        className="border-foreground text-foreground hover:bg-muted hover:text-primary-foreground hover:bg-primary hover:border-primary px-6 transition-all duration-200"
        size="lg"
      >
        <Copy className="h-4 w-4 mr-2" />
        Copy Card Details
      </Button>
    </div>
  );
}
