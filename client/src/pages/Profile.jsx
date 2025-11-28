import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2, Save, X, MapPin, Mail, Calendar, Star, Users } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/Label";
import toast from "react-hot-toast";

const AVAILABLE_INTERESTS = [
  "Stand-up Comedy",
  "Live Music",
  "Theater",
  "Art Exhibitions",
  "Tech Meetups",
  "Food & Wine",
  "Sports Events",
  "Movies",
  "Dance Performances",
  "Workshops",
];

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    city: "",
    phone: "",
    interests: [],
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        city: user.city || "",
        phone: user.phone || "",
        interests: user.interests || [],
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSave = async () => {
    // Validate
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (formData.interests.length < 3) {
      toast.error("Please select at least 3 interests");
      return;
    }

    // Update profile
    const result = await updateProfile({
      name: formData.name,
      bio: formData.bio,
      city: formData.city,
      phone: formData.phone,
      interests: formData.interests,
    });

    if (result.success) {
      toast.success("Profile updated successfully! 🎉");
      setIsEditing(false);
    } else {
      toast.error(result.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset form to original user data
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        city: user.city || "",
        phone: user.phone || "",
        interests: user.interests || [],
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  size="md"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  variant="primary"
                  size="md"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Profile Header Card */}
          <div className="card">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold text-white">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email (Read-only)</Label>
                      <Input
                        id="email"
                        value={formData.email}
                        disabled
                        className="bg-muted cursor-not-allowed"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{user.averageRating.toFixed(1)}</span>
                        <span className="text-muted-foreground">({user.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">About</h2>
            {isEditing ? (
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none resize-none"
                  maxLength={500}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {user.bio || "No bio added yet. Click 'Edit Profile' to add one!"}
              </p>
            )}
          </div>

          {/* Location & Contact */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Location & Contact</h2>
            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none"
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {user.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{user.city}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📱</span>
                    <span>{user.phone}</span>
                  </div>
                )}
                {!user.city && !user.phone && (
                  <p className="text-muted-foreground">No location or contact info added yet.</p>
                )}
              </div>
            )}
          </div>

          {/* Interests */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">
              Interests {isEditing && <span className="text-sm font-normal text-muted-foreground">(Select at least 3)</span>}
            </h2>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                AVAILABLE_INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {formData.interests.includes(interest) && "✓ "}
                    {interest}
                  </button>
                ))
              ) : user.interests && user.interests.length > 0 ? (
                user.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground">No interests added yet.</p>
              )}
            </div>
          </div>

          {/* Reviews Section (Placeholder) */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Reviews ({user.totalReviews})</h2>
            {user.totalReviews === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Attend events to get reviews!</p>
            ) : (
              <div className="space-y-4">
                {/* Mock review - replace with real data later */}
                <div className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">• 2 weeks ago</span>
                  </div>
                  <p className="text-foreground mb-1">"Great company! Had an amazing time at the event."</p>
                  <p className="text-sm text-muted-foreground">- John Doe (Comedy Show)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;