import { CreditCard, Send, DollarSign, FileText, Zap, Shield } from "lucide-react";

interface FeaturesProps {
  content: {
    title: string;
    subtitle: string;
    features: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

const iconMap = {
  card: CreditCard,
  send: Send,
  dollar: DollarSign,
  file: FileText,
  zap: Zap,
  shield: Shield,
};

export const Features = ({ content }: FeaturesProps) => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || CreditCard;
            
            return (
              <div
                key={index}
                className="bg-background p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-orange rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
