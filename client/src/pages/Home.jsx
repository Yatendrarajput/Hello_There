import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, Search } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { EventCard } from "../components/EventCard";

const mockEvents = [
  {
    id: 1,
    title: "Stand-Up Comedy Night with Kumar",
    category: "Comedy",
    date: "Dec 25, 2024",
    time: "7:00 PM",
    venue: "Comedy Club Mumbai",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop",
    availablePeople: 3,
  },
  {
    id: 2,
    title: "Indie Music Festival 2024",
    category: "Music",
    date: "Jan 5, 2025",
    time: "5:00 PM",
    venue: "Phoenix Marketcity",
    price: "₹1,299",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    availablePeople: 5,
  },
  {
    id: 3,
    title: "Classical Theater Performance",
    category: "Theater",
    date: "Dec 30, 2024",
    time: "6:30 PM",
    venue: "Prithvi Theatre",
    price: "₹599",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&auto=format&fit=crop",
    availablePeople: 2,
  },
];

const Home = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    city: "all",
    showAvailable: false,
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gradient">EventMeet</h1>
              <div className="hidden md:flex space-x-6">
                <Link to="/home" className="text-foreground font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link to="/bookings" className="text-muted-foreground hover:text-primary transition-colors">
                  My Bookings
                </Link>
                <Link to="/chats" className="text-muted-foreground hover:text-primary transition-colors relative">
                  Chats
                  <span className="absolute -top-1 -right-3 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-foreground" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Section */}
      <div className="bg-background border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search events..." 
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-4 py-2 rounded-lg border-2 border-border bg-background text-foreground 
                  focus:outline-none focus:border-primary transition-all"
              >
                <option value="all">All Categories</option>
                <option value="comedy">Comedy</option>
                <option value="music">Music</option>
                <option value="theater">Theater</option>
                <option value="sports">Sports</option>
              </select>

              <button
                onClick={() => setFilters({ ...filters, showAvailable: !filters.showAvailable })}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all whitespace-nowrap ${
                  filters.showAvailable
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-background border-border text-foreground hover:border-primary"
                }`}
              >
                🚩 Available People
              </button>
            </div>
          </div>

          {(filters.category !== "all" || filters.showAvailable) && (
            <div className="flex gap-2 mt-3">
              {filters.category !== "all" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: "all" })}>×</button>
                </span>
              )}
              {filters.showAvailable && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  Available People
                  <button onClick={() => setFilters({ ...filters, showAvailable: false })}>×</button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
