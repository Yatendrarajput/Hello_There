import { Link } from "react-router-dom";
import { Users, DollarSign, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { FeatureCard } from "../components/FeatureCard";
import { HowItWorksStep } from "../components/HowItWorksStep";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
            Meet Real People at Real Events
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Never attend concerts, comedy shows, or events alone. Connect, save together, and make memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/signup">
              <Button variant="secondary" size="lg" className="text-lg px-8 hover-scale">
                Get Started Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 bg-background/10 backdrop-blur border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
              >
                How It Works
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Users}
              title="Find Your Tribe"
              description="Connect with people who share your interests and passions for events you love"
            />
            <FeatureCard
              icon={DollarSign}
              title="Book Together, Save Together"
              description="Get 10% off when booking with companions - more fun, less cost"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Verified Profiles"
              description="Ratings and reviews for safe, trusted connections with real people"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            How It Works
          </h2>
          <div className="grid gap-8">
            <HowItWorksStep
              number={1}
              title="Browse events in your city"
              description="Explore concerts, comedy shows, sports events, and more happening near you"
            />
            <HowItWorksStep
              number={2}
              title="Find people looking for company"
              description="See who else wants to attend the same event and connect with them"
            />
            <HowItWorksStep
              number={3}
              title="Chat and book together"
              description="Get to know each other, plan your outing, and book tickets as a group"
            />
            <HowItWorksStep
              number={4}
              title="Enjoy the event and save money"
              description="Attend the event with your new companion and save 10% on tickets"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground">
            Ready to never go alone again?
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Join thousands of people making memories together
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="text-lg px-12 hover-scale shadow-glow">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 EventMeet. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
