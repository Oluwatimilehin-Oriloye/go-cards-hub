import { CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center mx-auto">
            <CreditCard className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Welcome to GO CARDS</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            You've successfully logged in! This is your dashboard where you can manage your virtual and physical cards.
          </p>
        </div>
      </div>
    </div>
  );
}
