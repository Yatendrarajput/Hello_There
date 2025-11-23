export const HowItWorksStep = ({ number, title, description }) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow">
        {number}
      </div>
      <div className="space-y-2 flex-1">
        <h4 className="font-bold text-lg">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
