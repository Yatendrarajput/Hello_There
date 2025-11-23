export const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="glass-card p-8 rounded-xl hover-lift text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary">
        <Icon className="h-8 w-8 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};
