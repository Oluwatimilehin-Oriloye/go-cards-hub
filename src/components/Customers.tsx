import customer1 from "@/assets/customer-1.jpg";
import customer2 from "@/assets/customer-2.jpg";

export const Customers = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              Trusted by Nigerians
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Banking Made Simple for Everyone
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of Nigerians who trust GO CARDS for their daily transactions. 
              From students to professionals, everyone loves the simplicity and security.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Zero Monthly Fees</div>
                  <div className="text-muted-foreground">Only pay ₦2,000 once when creating a card</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Instant Setup</div>
                  <div className="text-muted-foreground">Get your virtual card in seconds</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Complete Control</div>
                  <div className="text-muted-foreground">Freeze, delete, or view details anytime</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-fade-in-up">
            <div className="relative">
              <img
                src={customer1}
                alt="Happy GO CARDS customer"
                className="rounded-3xl shadow-card-hover w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-sm font-semibold">₦50,000+</div>
                <div className="text-xs text-muted-foreground">Sent this month</div>
              </div>
            </div>
            <div className="relative mt-12">
              <img
                src={customer2}
                alt="Satisfied GO CARDS user"
                className="rounded-3xl shadow-card-hover w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-sm font-semibold">3 Active Cards</div>
                <div className="text-xs text-muted-foreground">Maximum reached</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
