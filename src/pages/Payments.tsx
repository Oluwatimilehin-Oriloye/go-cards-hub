import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { LinkedPlatformsGrid } from "@/components/payments/LinkedPlatformsGrid";
import { PlatformLogos } from "@/components/payments/PlatformLogos";

const Payments = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        <TopNav />

        <main className="p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground mt-1">
              Manage your virtual cards and linked platforms
            </p>
          </div>

          {/* Platform Logos */}
          {/* <PlatformLogos 
            cardName="All Cards" 
            linkedPlatforms={["Jumia", "Konga", "Temu"]} 
          /> */}

          {/* Linked Platforms Section */}
          <LinkedPlatformsGrid />
        </main>
      </div>
    </div>
  );
};

export default Payments;
