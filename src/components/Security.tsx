import { Shield, Lock, Eye, Trash2 } from "lucide-react";

export const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Freeze Card Instantly",
      description: "Temporarily disable your card with one tap if it's lost or you suspect fraud",
    },
    {
      icon: Eye,
      title: "View Full Details",
      description: "Access complete card information including CVV whenever you need it",
    },
    {
      icon: Shield,
      title: "OTP Verification",
      description: "Every transaction requires OTP confirmation for maximum security",
    },
    {
      icon: Trash2,
      title: "Delete Anytime",
      description: "Permanently remove cards you no longer need, no questions asked",
    },
  ];

  return (
    <section id="security" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Bank-Level Security
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Money, Your Control
          </h2>
          <p className="text-xl text-muted-foreground">
            Nigerian cards only. Naira transactions only. Secured by GTBank infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-subtle p-6 rounded-2xl border border-border hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-orange group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-orange rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Protected by GTBank Technology
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Every transaction is encrypted and monitored 24/7. Your financial security 
            is our top priority, backed by decades of banking expertise.
          </p>
        </div>
      </div>
    </section>
  );
};
