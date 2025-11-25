import { useState } from "react";
import { LinkedPlatformCard } from "./LinkedPlatformCard";
import { ManagePlatformModal } from "./ManagePlatformModal";
import { ShoppingBag, ShoppingCart, Store } from "lucide-react";

interface Platform {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  cardLastFour: string;
}

const platforms: Platform[] = [
  {
    id: "temu",
    name: "Temu Card",
    subtitle: "Tap to manage linked cards for this platform.",
    icon: ShoppingBag,
    cardLastFour: "1234",
  },
  {
    id: "jumia",
    name: "Jumia Card",
    subtitle: "Tap to manage linked cards for this platform.",
    icon: ShoppingCart,
    cardLastFour: "5678",
  },
  {
    id: "konga",
    name: "Konga Card",
    subtitle: "Tap to manage linked cards for this platform.",
    icon: Store,
    cardLastFour: "9012",
  },
];

export function LinkedPlatformsGrid() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlatformClick = (platform: Platform) => {
    setSelectedPlatform(platform);
    setIsModalOpen(true);
  };

  return (
    <>
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Linked Platforms</h2>
          <p className="text-muted-foreground mt-1">
            Manage your virtual cards linked to shopping platforms
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <LinkedPlatformCard
              key={platform.id}
              platform={platform}
              onClick={() => handlePlatformClick(platform)}
            />
          ))}
        </div>
      </section>

      {selectedPlatform && (
        <ManagePlatformModal
          platformName={selectedPlatform.name}
          linkedCards={[
            { id: "1", name: selectedPlatform.name, lastFour: selectedPlatform.cardLastFour }
          ]}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
