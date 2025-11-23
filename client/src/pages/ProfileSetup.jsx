import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

const interests = [
  { id: "comedy", label: "🎤 Stand-up Comedy" },
  { id: "music", label: "🎵 Live Music" },
  { id: "theater", label: "🎭 Theater" },
  { id: "art", label: "🎨 Art" },
  { id: "tech", label: "💻 Tech Meetups" },
  { id: "food", label: "🍷 Food & Wine" },
  { id: "sports", label: "⚽ Sports" },
  { id: "movies", label: "🎬 Movies" },
];

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    bio: "",
    city: "",
    selectedInterests: [],
    lookingFor: "",
  });

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interestId)
        ? prev.selectedInterests.filter((id) => id !== interestId)
        : [...prev.selectedInterests, interestId],
    }));
  };

  const handleContinue = () => {
    if (step === 1 && (!formData.bio || !formData.city)) {
      toast.error("Please fill in all fields");
      return;
    }
    if (step === 2 && formData.selectedInterests.length < 3) {
      toast.error("Please select at least 3 interests");
      return;
    }
    if (step === 3 && !formData.lookingFor) {
      toast.error("Please select an option");
      return;
    }
    
    if (step === 3) {
      toast.success("Profile setup complete!");
      navigate("/home");
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-muted/30">
      <div className="w-full max-w-2xl space-y-8 animate-fade-in">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-background rounded-xl p-8 shadow-lg border border-border">
          {/* Step 1: About You */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-gradient">About You</h2>
                <p className="text-muted-foreground">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell others about yourself..."
                  maxLength={150}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground 
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                    transition-all duration-200 resize-none placeholder:text-muted-foreground"
                />
                <p className="text-sm text-muted-foreground text-right">
                  {formData.bio.length}/150
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <select
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground 
                    focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 
                    transition-all duration-200"
                >
                  <option value="">Select your city</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="delhi">Delhi</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="pune">Pune</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="chennai">Chennai</option>
                </select>
              </div>

              <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-gradient">Your Interests</h2>
                <p className="text-muted-foreground">Select at least 3 interests</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`px-4 py-3 rounded-lg border-2 font-medium transition-all duration-200 hover:scale-105 ${
                      formData.selectedInterests.includes(interest.id)
                        ? "bg-primary border-primary text-primary-foreground shadow-glow"
                        : "bg-background border-border text-foreground hover:border-primary"
                    }`}
                  >
                    {interest.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="w-full">
                  Back
                </Button>
                <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-gradient">Your Preferences</h2>
                <p className="text-muted-foreground">What are you looking for?</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: "friends", label: "Make new friends" },
                  { id: "buddies", label: "Find activity buddies" },
                  { id: "network", label: "Network professionally" },
                  { id: "all", label: "All of the above" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFormData({ ...formData, lookingFor: option.id })}
                    className={`w-full px-6 py-4 rounded-lg border-2 text-left font-medium transition-all duration-200 hover:scale-[1.02] ${
                      formData.lookingFor === option.id
                        ? "bg-primary border-primary text-primary-foreground shadow-glow"
                        : "bg-background border-border text-foreground hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          formData.lookingFor === option.id
                            ? "border-primary-foreground"
                            : "border-border"
                        }`}
                      >
                        {formData.lookingFor === option.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" size="lg" className="w-full">
                  Back
                </Button>
                <Button onClick={handleContinue} variant="primary" size="lg" className="w-full">
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
