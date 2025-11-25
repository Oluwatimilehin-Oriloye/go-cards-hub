import { Card } from "@/components/ui/card";

interface LinkedPlatformCardProps {
  platform: {
    name: string;
    subtitle: string;
    icon: React.ElementType;
  };
  onClick: () => void;
}

export function LinkedPlatformCard({ platform, onClick }: LinkedPlatformCardProps) {
  const Icon = platform.icon;

  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] p-8 border-2 border-border hover:border-primary/30 bg-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Manage ${platform.name}`}
    >
      {/* Orange accent glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center gap-4">
        {/* Icon container */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-10 h-10 text-primary" aria-hidden="true" />
        </div>

        {/* Text content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {platform.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {platform.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Card>
  );
}
