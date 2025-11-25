import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export function VirtualCardsSection() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Your Virtual Cards</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Add Virtual Card - Empty State */}
        <Card className="group flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border bg-secondary p-8 transition-all hover:border-primary hover:shadow-md cursor-pointer focus-within:ring-2 focus-within:ring-primary">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Plus className="h-8 w-8 text-primary" aria-hidden="true" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-foreground">Add a Virtual Card</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage virtual cards instantly
            </p>
          </div>
        </Card>

        {/* Placeholder for future cards */}
        <div className="hidden sm:block opacity-0"></div>
        <div className="hidden lg:block opacity-0"></div>
      </div>
    </section>
  );
}
