import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, UserCircle, Shield } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
    setIsOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-primary-foreground" />
          )}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50 animate-scale-in">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-foreground">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || "email@example.com"}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => handleNavigation("/profile")}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <UserCircle className="w-4 h-4" />
              My Profile
            </button>

            <button
              onClick={() => handleNavigation("/profile-setup")}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Settings className="w-4 h-4" />
              Update Profile
            </button>

            <button
              onClick={() => handleNavigation("/settings")}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Shield className="w-4 h-4" />
              Settings & Privacy
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-border py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;