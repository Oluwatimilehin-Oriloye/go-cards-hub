import { Card } from "@/components/ui/card";

const platformLogos = [
  { name: "Apple", color: "bg-gray-900", initial: "A" },
  { name: "Samsung", color: "bg-blue-600", initial: "S" },
  { name: "Konga", color: "bg-orange-600", initial: "K" },
  { name: "Jumia", color: "bg-orange-500", initial: "J" },
  { name: "Amazon", color: "bg-yellow-600", initial: "A" },
  { name: "Temu", color: "bg-red-600", initial: "T" },
  { name: "Netflix", color: "bg-red-600", initial: "N" },
  { name: "Spotify", color: "bg-green-600", initial: "S" },
];

interface PlatformLogosProps {
  cardName: string;
  linkedPlatforms?: string[];
}

export function PlatformLogos({ cardName, linkedPlatforms = [] }: PlatformLogosProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Available Platforms</h3>
        <p className="text-sm text-muted-foreground">
          Services you can link your virtual card to
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {platformLogos.map((platform) => (
          <div
            key={platform.name}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div
              className={`
                w-16 h-16 rounded-2xl ${platform.color} 
                flex items-center justify-center
                text-white font-bold text-xl
                shadow-md
                transition-all duration-200
                hover:scale-105 hover:shadow-lg
              `}
            >
              {platform.initial}
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {platform.name}
            </span>
          </div>
        ))}
      </div>

      {linkedPlatforms.length > 0 && (
        <Card className="p-4 bg-muted/50 border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Currently Linked to {cardName}
          </h4>
          <div className="flex flex-wrap gap-2">
            {linkedPlatforms.map((platform) => {
              const logo = platformLogos.find((p) => p.name === platform);
              return logo ? (
                <div
                  key={platform}
                  className={`
                    ${logo.color} 
                    text-white text-xs font-medium
                    px-3 py-1.5 rounded-full
                    flex items-center gap-2
                  `}
                >
                  <span className="font-bold">{logo.initial}</span>
                  {platform}
                </div>
              ) : null;
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
